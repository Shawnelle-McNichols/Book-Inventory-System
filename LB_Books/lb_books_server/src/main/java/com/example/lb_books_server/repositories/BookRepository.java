package com.example.lb_books_server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lb_books_server.models.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{
    
}
