package ru.kulinartem.restboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kulinartem.restboot.entity.Role;
import ru.kulinartem.restboot.repository.RoleRepository;


import java.util.List;

@Service ("RoleServiceImpl")
public class RoleServiceImpl implements RoleService{

    private final RoleRepository repository;

    @Autowired
    public RoleServiceImpl(RoleRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public List<Role> getAllItems() {
        return repository.findAll();
    }
}
