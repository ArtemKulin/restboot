package ru.kulinartem.restboot.service;




import ru.kulinartem.restboot.entity.Role;

import java.util.List;

public interface RoleService {

    public List<Role> getAllItems();

    public Role findRoleByRole(String name);
}
