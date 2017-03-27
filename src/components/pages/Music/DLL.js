class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
    this.previous = null;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  add(value, i) {
    const node = new Node(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else if (i < 1) {
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    } else if (i > 0 && i < this.length) {
      let count = 0;
      let current = this.head;

      while (count < i) {
        current = current.next;
        count += 1;
      }
      node.previous = current.previous;
      node.next = current;
      current.previous.next = node;
      current.previous = node;
    } else {
      this.tail.next = node;
      node.previous = this.tail;
      this.tail = node;
    }

    this.length += 1;
  }

  getNodeAt(position) {
    let count = 0;
    let current = this.head;
    while (count < position) {
      current = current.next;
      count += 1;
    }
    return current.data;
  }

  remove(position) {
    let count = 0;
    let current = this.head;
    if (position < 1) {
      this.head = current.next;
      this.head.previous = null;
    } else if (position === this.length - 1) {
      this.tail.next = null;
      this.tail = this.tail.previous;
    } else if (position > 0 && position < this.length - 1) {
      while (count < position) {
        current = current.next;
        count += 1;
      }
      current.previous.next = current.next;
      current.next.previous = current.previous;
      current.previous = null;
      current.next = null;
    }
    this.length -= 1;
  }

  printList() {
    let count = 0;
    let current = this.head;
    const array = [];
    while (count < this.length) {
      array.push(current.data);
      current = current.next;
      count += 1;
    }
  }
 }

const p = new DoublyLinkedList();
p.add(10, 0);
p.add(20, 0);
p.add(30, 1);
p.add(11, 1);
p.getNodeAt(0);
p.printList();
p.remove(0);
p.printList();
