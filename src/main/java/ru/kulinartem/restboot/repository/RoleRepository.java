package ru.kulinartem.restboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kulinartem.restboot.entity.Role;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findRoleByRole (String name);
}
