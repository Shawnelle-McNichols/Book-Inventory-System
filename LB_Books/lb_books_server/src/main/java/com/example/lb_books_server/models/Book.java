package com.example.lb_books_server.models;

import java.io.Serializable;
//import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
public class Book implements Serializable {
    public Book (){
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @ElementCollection
    private List<String> authors;

    private String isbn;

    @ElementCollection
    private List<String> genres;

    private String description;

    private String thumbnail;

    @Column(name = "pub_date")
	//@Temporal(TemporalType.DATE)
	private String pubDate;
	
	private Float price;
	private Integer quantity;
    
    public Book(Integer id, String title, List<String> authors, String isbn, List<String> genres, String description,
			String thumbnail, String pubDate, Float price, Integer quantity) {
		this.id = id;
		this.title = title;
		this.authors = authors;
		this.isbn = isbn;
		this.genres = genres;
		this.description = description;
		this.thumbnail = thumbnail;
		this.pubDate = pubDate;
		this.price = price;
		this.quantity = quantity;
	}
	public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public List<String> getAuthors() {
        return authors;
    }
    public void setAuthors(List<String> author) {
        this.authors = author;
    }
    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public List<String> getGenres() {
        return genres;
    }
    public void setGenres(List<String> genre) {
        this.genres = genre;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getThumbnail() {
        return thumbnail;
    }
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    public String getPubDate() {
        return pubDate;
    }
    public void setPubDate(String pubDate) {
        this.pubDate = pubDate;
    }
    public Float getPrice() {
        return price;
    }
    public void setPrice(Float price) {
        this.price = price;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    
}