package com.example.lb_books_server.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.lb_books_server.models.Book;
import com.example.lb_books_server.repositories.BookRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BookService {
   
    @Autowired
    private RestTemplate restTemplate;
    private final String googleBooksApiKey;

    @Autowired
    private BookRepository bookRepository;

    public BookService(RestTemplate restTemplate,
    @Value("${google.books.api.key}") String googleBooksApiKey) {
        this.restTemplate = restTemplate;
        this.googleBooksApiKey = googleBooksApiKey;
    }

    public List<Map<String, Object>> searchBooks(String query) throws JsonMappingException, JsonProcessingException
    {
        String url = "https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=" + googleBooksApiKey;
        String response =  restTemplate.getForObject(url, String.class);

        if (response == null ) {
            throw new RuntimeException("Failed to fetch books from Google Books API");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(response);
        JsonNode items = rootNode.path("items");

        List<Map<String,Object>> books = new ArrayList<>();
        if (items.isArray()) {
            for (JsonNode item : items) 
            {
                Map<String,Object> book = new HashMap<>();
                JsonNode volumeInfo = item.path("volumeInfo");

                book.put("id", item.get("id").asText());
                book.put("title", volumeInfo.path("title").asText());
                //book.put("authors", volumeInfo.path("authors").isArray() ? volumeInfo.path("authors").toString() : "Unknown");
                JsonNode authorsNode = volumeInfo.path("authors");
                
                if (authorsNode.isArray()){
                    List<String> authors = new ArrayList<>();
                    for (JsonNode authorNode : authorsNode) {
                        authors.add(authorNode.asText());
                    }
                    book.put("authors", authors);
                } else {
                    book.put("authors", Collections.singletonList("Unknown"));
                }
                book.put("isbn", volumeInfo.path("industryIdentifiers").isArray() && volumeInfo.path("industryIdentifiers").size() > 0
                        ? volumeInfo.path("industryIdentifiers").get(0).path("identifier").asText() : "N/A");
                //book.put("genres", volumeInfo.path("categories").isArray() ? volumeInfo.path("categories").toString() : "Unknown");
                JsonNode categoriesNode = volumeInfo.path("categories");
                if (categoriesNode.isArray()){
                    List<String> genres = new ArrayList<>();
                    for (JsonNode categoryNode : categoriesNode){
                        genres.add(categoryNode.asText());
                    }
                    book.put("genres", genres);
                }else {
                    book.put("genres", Collections.singletonList("Unknown"));
                }
                book.put("description", volumeInfo.path("description").asText("No description available"));
                book.put("thumbnail", volumeInfo.path("imageLinks").path("thumbnail").asText("No thumbnail available"));
                book.put("pubDate", volumeInfo.path("publishedDate").asText("No publish date available"));
                /*book.put("title", item.get("volumeInfo").get("title").asText());
                book.put("authors", item.get("volumeInfo").get("authors").toString());
                book.put("isbn", item.get("volumeInfo").get("industryIdentifiers").get(0).get("identifier").asText());
                book.put("genres", item.get("volumeInfo").get("categories").toString());
                book.put("description", item.get("volumeInfo").get("description").asText());
                book.put("thumbnail", item.get("volumeInfo").get("imageLinks").get("thumbnail").asText());
                book.put("pubDate", item.get("volumeInfo").get("publishedDate").asText());*/

                books.add(book);
            }

        } else {
            throw new RuntimeException("No books found!");
        }
        return books;
    }

    public Book addBook(Book book){
        return bookRepository.save(book);
    }

}
