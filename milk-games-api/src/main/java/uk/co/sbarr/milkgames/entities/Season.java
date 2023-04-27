package uk.co.sbarr.milkgames.entities;

import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import uk.co.sbarr.milkgames.entities.relationships.SeasonPlayer;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Table(name = "seasons")
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(View.Entity.class)
    private Long id;

    @Column(nullable = false)
    @JsonView(View.Entity.class)
    private String name;

    @OneToMany(mappedBy = "season", cascade = CascadeType.ALL)
    @JsonView(View.Season.class)
    private Set<Tournament> tournaments = new HashSet<>();

    @OneToMany(mappedBy = "season")
    @JsonView(View.Season.class)
    private Set<SeasonPlayer> seasonPlayers = new HashSet<>();

    public Season() {}

    public Season(String name) {
        this.name = name;
    }
}
