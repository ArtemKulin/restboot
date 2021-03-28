package ru.kulinartem.restboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kulinartem.restboot.entity.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {
}
