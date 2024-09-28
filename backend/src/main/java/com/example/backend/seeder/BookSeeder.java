package com.example.backend.seeder;

import com.example.backend.entity.Book;
import com.example.backend.repository.BookRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookSeeder {

    @Autowired
    private BookRepository bookRepository;

    @PostConstruct
    public void seedBooks() {
        if (bookRepository.count() == 0) {
            Book book1 = new Book();
            book1.setTitle("The Great Gatsby");
            book1.setAuthor("F. Scott Fitzgerald");
            book1.setIsbn("9780743273565");
            book1.setPrice(10.99);

            Book book2 = new Book();
            book2.setTitle("1984");
            book2.setAuthor("George Orwell");
            book2.setIsbn("9780451524935");
            book2.setPrice(8.99);

            Book book3 = new Book();
            book3.setTitle("To Kill a Mockingbird");
            book3.setAuthor("Harper Lee");
            book3.setIsbn("9780061120084");
            book3.setPrice(7.99);

            bookRepository.save(book1);
            bookRepository.save(book2);
            bookRepository.save(book3);
        }
    }
}
