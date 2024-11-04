---
marp: true
theme: gaia
class: invert
paginate: true
---
<!-- _class: lead -->

# Hexagonal Architecture

![bg blur:5px](big-hexagons.jpg)

<style scoped>
section.lead {
  color: #FAB3A9;
}
</style>

---

> The purpose of a good architecture is to defer decisions, delay decisions. The job of an architect is not to make decisions, the job of an architect is to build a structure that allows decisions to be delayed as long as possible. Why? **Because when you delay a decision, you have more information when it comes time to _make_** **_it._**
> 
> — “Clean Architecture” Robert C. Martin

---

# Plan

- Intro 5 min
- Kata: first try 30 min
- Presentation 30 min
- Kata: second try 30 min
- Debrief 
- Application to our code

---

# Code Kata

-  What is a kata?
-  Purpose

https://codingdojo.org/kata

![bg right 60%](Hugging_Gophers.png)

---

# Birthday Greetings Kata

![bg right 60%](birthday.png)

Goal: learn about hexagonal architecture

---

Problem:
**Write a program that...**

- Loads a set of employee records
- Sends a greetings email to all employees whose birthday is today

![bg right 100%](This_is_Fine_Gopher.png)

---

## Goal: refactor the code so that it is more...

- Testable: we can write unit tests (see definition next slide)
- Flexible:
  - It should not cost a lot to change when requirements change.
  - Business logic must not depend on low-level APIs
- Well-designed: separate clearly the business logic from the infrastructure.

---

### Unit tests

A test is not a unit test if:

    It talks to a database
    It communicates across the network
    It touches the file system
    You have to do things to your environment to run it (eg, change config files, comment lines)

A unit test tests a `unit` of code. Not necessarily a function.


<!-- 
Why unit tests?
- Shorten the feedback loop to check if business logic is not broken
 -->

---

# Not Goals!

- Make perfect code
- Have full coverage with unit tests
- Improve performances
- Change the logic of the service
  - But you can change the prototypes and interfaces

---

# Coding time

![bg 50%](GOPHER_SHARE.png)

---

# Coding time

![bg left 50%](GOPHER_SHARE.png)

- Testable code
- Flexible code
- Easy to read, and well designed

---


![bg 80%](image-1.png)

---

![bg 100%](image-2.png)

---

# Hexagonal Architecture

![bg right 100%](image-10.png)

Alistair Cockburn (2005)

- Domain Model depends on nothing
- Everything depends on the domain model

<!-- 
This is not an hexagon (not 6 but multiple parts)
 -->

---

# Dependency Inversion Principle

![](Dependency_inversion.png)

    High-level modules should not depend on low-level modules. Both should depend on abstractions.
    Abstractions should not depend on details. Details should depend on abstractions.

---

![bg 80%](image-9.png)

---

# Pros

- More testable code
- More explicit design
- Better separation of concerns. Isolate application logic.
- Switch technos easily (DB, mail provider...)
- Less risk with dependencies

---

# Cons

- A bit verbose
- Without an Inversion of Control framework, we may need some boilerplate code to pass the dependencies to the services
- More thinking to do when defining interfaces
  - Can be difficult when creating the dependency


--- 

# Tooling

![bg 30%](image-7.png)

---

# Back to the Kata

Refactoring the service

![bg right 80%](GO_LEARN.png)

---

![bg 100%](image-5.png)

<!-- 
First step would be to extract the low-level modules: employee repo and mail service.
This creates an n-tier architecture
 -->

---


<!-- Second step -->
![bg 100%](image-6.png)

---

![bg 100%](image-4.png)


---

--- 

# Apply to our code?

---

# Important points

- Isolate business logic from the 'low-level' modules
- No dependencies in application core when possible
- Application core should at least call custom code, which manage the dependencies

---


 Clean architecture

![bg 50%](image-11.png)

---

Onion architecture

![bg right 80%](image-12.png)

---

Inversion of Control:
 A framework calls the code

Dependency Inversion Principle
  Depend on interface, not implementation

Dependency Injection
  Give the dependency to the module

  ![bg right 60%](image-13.png)
