module Universable
  extend ActiveSupport::Concern

  included do
    belongs_to :universe
    belongs_to :club

    # TODO?
    # validates_presence_of :start_date, :end_date

    # IMPORTANT
    # Assumes a record in universe_id 2 will have been
    # *backfilled* so as to cover all records in universe_id 1
    # (that match universable_clause)
    # e.g.,

    #                       \/ current date (player traded)
    # |-------------------------| universe_id=1,univ_clause=foobarbaz
    # |------|--|---------------| universe_id=1,univ_clause=abc123
    # |------|--|-----------|---| universe_id=2,univ_clause=abc123

    # even though the divergence from univ 1 to 2 occurred on day 22
    # of 25, a record spanning from 0 - 22 in universe_2 is expected
    # to exist

    # if it *was not* backfilled, the end result would be 3 days (22-25)
    # of data, as opposed to the full 25 (since we select the distinct 
    # univ_clauses along with their siblings in the *same universe only*)

    # this logic could perhaps change later to allow for data like
    # (would just need to have some more complicated date logic):

    #                       \/ current date (player traded)
    # |-------------------------| universe_id=1,univ_clause=foobarbaz
    # |------|--|---------------| universe_id=1,univ_clause=abc123
    #           |-----------|---| universe_id=2,univ_clause=abc123

    scope :universable, -> {
      c = universable_clause

      joins("
        INNER JOIN (
          SELECT
            DISTINCT ON (#{universable_clause}) #{table_name}.*,
            (#{universable_clause}) AS distinction
          FROM #{table_name}
          ORDER BY #{universable_clause}, #{table_name}.universe_id != 1 DESC
        ) AS distincts
        ON
          distincts.universe_id = #{table_name}.universe_id AND
          distincts.distinction = (#{universable_clause})
      ")
    } do
      def for_universe(universe_id)
        joins("
          INNER JOIN universes ON
            #{table_name}.universe_id IN (1, #{universe_id})
        ")        
      end

      def for_team(team_id)
        joins("
          INNER JOIN teams ON
            teams.id = #{team_id} AND
            #{table_name}.universe_id IN (1, teams.universe_id) AND
            teams.club_id = #{table_name}.club_id"
        )
      end

      def on_universe_date(universe_id)
        between(Universe.find(universe_id).date)
      end

      def on_team_date(team_id)
        between(Team.find(team_id).date)
      end

      def on_date(date)
        between(date)
      end

      private

      def between(date)
        if column_names.include?('date')
          where("#{table_name}.date = ?", date)
        else
          where("#{table_name}.start_date <= ? AND #{table_name}.end_date >= ?", date, date)
        end
      end
    end
  end
end
