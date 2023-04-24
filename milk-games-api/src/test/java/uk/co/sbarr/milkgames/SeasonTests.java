package uk.co.sbarr.milkgames;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import jakarta.transaction.Transactional;
import uk.co.sbarr.milkgames.entities.Player;
import uk.co.sbarr.milkgames.entities.Season;
import uk.co.sbarr.milkgames.entities.Tournament;
import uk.co.sbarr.milkgames.entities.relationships.SeasonPlayer;
import uk.co.sbarr.milkgames.entities.relationships.pk.SeasonPlayerPK;
import uk.co.sbarr.milkgames.repositories.PlayerRepository;
import uk.co.sbarr.milkgames.repositories.SeasonPlayerRepository;
import uk.co.sbarr.milkgames.repositories.SeasonRepository;
import uk.co.sbarr.milkgames.repositories.TournamentRepository;

@SpringBootTest
@Transactional
public class SeasonTests {

    @Autowired
    private SeasonRepository seasonRepo;

    @Autowired
    private PlayerRepository playerRepo;

    @Autowired
    private SeasonPlayerRepository seasonPlayerRepo;

    @Autowired
    private TournamentRepository tournamentRepo;

    @Test
    public void canAddPlayersToSeasons() {
        Season season1 = new Season("Season 1");
        Season season2 = new Season("Season 2");
        seasonRepo.save(season1);
        seasonRepo.save(season2);

        Player player1 = new Player("Player 1");
        Player player2 = new Player("Player 2");
        playerRepo.save(player1);
        playerRepo.save(player2);

        season1.getPlayers().add(player1);
        season2.getPlayers().add(player2);
        seasonRepo.save(season1);
        seasonRepo.save(season2);

        SeasonPlayer seasonPlayer12 = new SeasonPlayer(season1, player2, 10);
        SeasonPlayer seasonPlayer21 = new SeasonPlayer(season2, player1, 5);

        seasonPlayerRepo.save(seasonPlayer12);
        seasonPlayerRepo.save(seasonPlayer21);

        assertEquals(0, seasonPlayerRepo.findById(new SeasonPlayerPK(1l, 1l)).get().getPoints());
        assertEquals(10, seasonPlayerRepo.findById(new SeasonPlayerPK(1l, 2l)).get().getPoints());
        assertEquals(5, seasonPlayerRepo.findById(new SeasonPlayerPK(2l, 1l)).get().getPoints());
        assertEquals(0, seasonPlayerRepo.findById(new SeasonPlayerPK(2l, 2l)).get().getPoints());
    }

    @Test
    public void canAddTournamentsToSeasons() {
        Season season1 = new Season("Season 1");
        Season season2 = new Season("Season 2");
        seasonRepo.save(season1);
        seasonRepo.save(season2);

        Player player1 = new Player("Player 1");
        Player player2 = new Player("Player 2");
        playerRepo.save(player1);
        playerRepo.save(player2);

        LocalDate now = LocalDate.now();
        Tournament t1 = new Tournament("Tournament 1", season1, "single", 16, 2, 10,
                now.plusDays(1), now.plusDays(2));
    }
}
