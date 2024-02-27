package br.com.development.TaskManager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Lob
    @Column(name = "image_profile", columnDefinition="LONGBLOB")
    private byte[] imageProfile;
}
