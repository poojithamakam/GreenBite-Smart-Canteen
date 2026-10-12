package com.smartcanteen.service;
import com.smartcanteen.entity.AppUser;import com.smartcanteen.repository.UserRepository;import org.springframework.security.core.context.SecurityContextHolder;import org.springframework.stereotype.Service;
@Service public class CurrentUser {private final UserRepository users;public CurrentUser(UserRepository u){users=u;}public AppUser get(){String email=SecurityContextHolder.getContext().getAuthentication().getName();return users.findByEmailIgnoreCase(email).orElseThrow(()->new IllegalArgumentException("User not found"));}}
