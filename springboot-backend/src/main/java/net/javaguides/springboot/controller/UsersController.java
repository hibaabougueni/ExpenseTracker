package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.model.Users;
import net.javaguides.springboot.model.Transaction;
import net.javaguides.springboot.repository.UsersRepository;
import net.javaguides.springboot.repository.TransactionRepository;
import net.javaguides.springboot.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/users/")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    

    @GetMapping("/list")
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @PostMapping("/list")
    public Users addUsers(@RequestBody Users users) {
        String username = users.getUsername();
	    String password = users.getPswd();  
	    Users isUsernameExist=usersRepository.findByUsername(username);
        if (isUsernameExist!=null) {
	        	return null;
	        }

			Users createdUser= new Users();
			createdUser.setUsername(username);
	        createdUser.setPswd(password);
	        return usersRepository.save(createdUser);
    }

    @GetMapping("/{userId}/utransactions")
    public List<Transaction> getTransactionsByUserId(@PathVariable Long userId) {
        Users user = usersRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id :" + userId));
        return user.getTransactions();
    }

}
