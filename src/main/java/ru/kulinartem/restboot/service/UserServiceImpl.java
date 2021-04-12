package ru.kulinartem.restboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kulinartem.restboot.entity.User;
import ru.kulinartem.restboot.repository.UserRepository;


import java.util.List;

@Service ("UserServiceImpl")
public class UserServiceImpl implements UserService{

    private final UserRepository repository;

    @Autowired
    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @Override
    public User getItemById(long id) throws UsernameNotFoundException {
        return repository.findById(id).orElseThrow(() ->
                new UsernameNotFoundException("User with " + id + " not found!"));
    }

    @Transactional
    @Override
    public List<User> getAllItems() {
        return repository.findAll();
    }

    @Transactional
    @Override
    public void saveItem(User item) {
        item.setPassword(new BCryptPasswordEncoder(12).encode(item.getPassword()));
        repository.save(item);
    }

    @Transactional
    @Override
    public void deleteItem(User item) {
        repository.delete(item);
    }


    @Transactional
    @Override
    public User getItemByEmail(String email) {
        return repository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User doesn't exists"));
    }
}
