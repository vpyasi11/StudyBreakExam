import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div class="home">
      <h1>Welcome to Study Break Exam</h1>
      <button>
        <Link to="/signup">Start Exam</Link>
      </button>
    </div>
  );
}
