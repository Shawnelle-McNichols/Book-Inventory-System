package com.example.lb_books_server.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.lb_books_server.models.Book;
import com.example.lb_books_server.services.BookService;
import com.example.lb_books_server.repositories.BookRepository;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

	private static final int MAX = 255;

	private String truncateText(String text){
		if(text!= null && text.length() > MAX){
			return text.substring(0, MAX);
		}
		return text;
	}
	@Autowired
	private BookService bookService;

	@Autowired
	private BookRepository bookRepository;

	// GET - Search using Google Books API
	@GetMapping("/search")
	public ResponseEntity<List<Map<String, Object>>> searchBooks(@RequestParam String query) {
		try {
			List<Map<String, Object>> books = bookService.searchBooks(query);
			return ResponseEntity.ok(books);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).build();
		}
	}

	// Add book
	// @PostMapping("/add")
	// @CrossOrigin(origins = "http://localhost:3000")
	// public ResponseEntity<String> addBook(@RequestBody Book book) {
	// try {
	// Book savedBook = bookRepository.save(book);
	// return ResponseEntity.ok(savedBook);
	// } catch(Exception e) {
	// e.printStackTrace();
	// return ResponseEntity.status(500).build();
	// return new ResponseEntity<>("Book added successfully", HttpStatus.OK);
	// }

	//List All Books
	@GetMapping
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}

	//Return Specific Book
	@GetMapping("/{id}")
	public ResponseEntity<Book> getById(@PathVariable Integer id){
		Book book = bookRepository.findById(id).orElse(null);
		return book != null ? ResponseEntity.ok(book) : ResponseEntity.notFound().build();
	
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable Integer id, @RequestBody Book updatedBook){
		return bookRepository.findById(id)
		.map(book -> {
			book.setTitle(updatedBook.getTitle());
			book.setAuthors(updatedBook.getAuthors());
			book.setIsbn(updatedBook.getIsbn());
			book.setGenres(updatedBook.getGenres());
			book.setDescription(updatedBook.getDescription());
			book.setThumbnail(updatedBook.getThumbnail());
			book.setPubDate(updatedBook.getPubDate());
			book.setPrice(updatedBook.getPrice());
			book.setQuantity(updatedBook.getQuantity());
			bookRepository.save(book);
			return ResponseEntity.ok(book);
		})
		.orElseGet(()-> ResponseEntity.notFound().build());
	}
	
	@PostMapping("/add")
	public ResponseEntity<Book> addBook(@RequestBody Book book) {
		try {
			String desc = truncateText(book.getDescription());
			book.setDescription(desc);
			Book savedBook = bookRepository.save(book);
			return ResponseEntity.ok(savedBook);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).build();
		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBook(@PathVariable Integer id) {
		if(!bookRepository.existsById(id)){
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found");
		}
		bookRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
