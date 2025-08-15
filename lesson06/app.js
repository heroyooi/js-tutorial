// 1) 기본 클래스 Book
export function runTask1() {
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
    info() {
      console.log(`제목: ${this.title}, 저자: ${this.author}`);
    }
  }

  const b1 = new Book("클린 코드", "로버트 C. 마틴");
  console.clear();
  b1.info();

  document.getElementById('out-task1').textContent =
    `Book 인스턴스: ${b1.title} / ${b1.author}`;
}

// 2) 상속 활용 – EBook
export function runTask2() {
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
    info() {
      console.log(`제목: ${this.title}, 저자: ${this.author}`);
    }
  }

  class EBook extends Book {
    constructor(title, author, fileSize) {
      super(title, author);
      this.fileSize = fileSize;
    }
    info() {
      console.log(
        `제목: ${this.title}, 저자: ${this.author}, 파일 용량: ${this.fileSize}MB`
      );
    }
  }

  const eb1 = new EBook("이펙티브 타입스크립트", "댄 밴더캄", 12.8);
  console.clear();
  eb1.info();

  document.getElementById('out-task2').textContent =
    `EBook: ${eb1.title} / ${eb1.author} / ${eb1.fileSize}MB`;
}

// 3) super 활용 – 부모 info() 호출
export function runTask3() {
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
    info() {
      console.log(`제목: ${this.title}, 저자: ${this.author}`);
    }
  }

  class EBook2 extends Book {
    constructor(title, author, fileSize) {
      super(title, author);
      this.fileSize = fileSize;
    }
    info() {
      super.info();
      console.log(`파일 용량: ${this.fileSize}MB`);
    }
  }

  const eb2 = new EBook2("리팩터링 2판", "마틴 파울러", 9.6);
  console.clear();
  eb2.info();

  document.getElementById('out-task3').textContent =
    `EBook2: ${eb2.title} / ${eb2.author} / ${eb2.fileSize}MB`;
}

// 4) 보너스 – toString 활용
export function runTask4() {
  class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
    info() {
      console.log(`제목: ${this.title}, 저자: ${this.author}`);
    }
  }

  class BookPretty extends Book {
    toString() {
      return `📚 ${this.title} — ${this.author}`;
    }
  }

  const bp = new BookPretty("클린 아키텍처", "로버트 C. 마틴");
  console.clear();
  console.log(String(bp));

  document.getElementById('out-task4').textContent = String(bp);
}

// 버튼 이벤트 등록
document.getElementById('btn-task1')?.addEventListener('click', runTask1);
document.getElementById('btn-task2')?.addEventListener('click', runTask2);
document.getElementById('btn-task3')?.addEventListener('click', runTask3);
document.getElementById('btn-task4')?.addEventListener('click', runTask4);

