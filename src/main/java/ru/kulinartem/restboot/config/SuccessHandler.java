package ru.kulinartem.restboot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ru.kulinartem.restboot.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository repository;

    @Autowired
    public SuccessHandler(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
        String name = httpServletRequest.getParameter("username");
        long id = repository.findByEmail(name).get().getId();
        if (roles.contains("ROLE_ADMIN")) {
            httpServletResponse.sendRedirect("/admin/users");
        } else {
            httpServletResponse.sendRedirect("/user/" + id);
        }
    }
}

