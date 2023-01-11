import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Input } from "../components/Input";
import Layout from "../components/Layout";

interface TodoType {
  id: string;
  content: string;
  create_at: boolean;
  complete: boolean;
  onClickEdit: () => void;
  is_completed: boolean;
}

export const Index = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [inputTask, setInputTask] = useState<string>("");
  const [complate, setComplate] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("https://api.todoist.com/rest/v2/tasks", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        const updatedTodos = res.data.map((todo: any) => ({
          ...todo,
          onClickEdit: () => handleEditTask(todo.id),
        }));

        setTodos(updatedTodos);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  function handleAddTask() {
    const body = {
      content: inputTask,
    };
    axios
      .post("https://api.todoist.com/rest/v2/tasks", body, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        alert("Berhasil menambahkan todo");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInputTask("");
        fetchData();
      });
  }

  function handleEditTask(id: string) {
    console.log(todos);
    // const updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     return { ...todo, complete: !todo.complete };
    //   }
    //   return todo;
    // });

    // setTodos(updatedTodos);
  }

  function handleDeleteTask(todo: TodoType) {
    axios
      .delete(`https://api.todoist.com/rest/v2/tasks/${todo.id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        alert("Berhasil menghapus todo");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchData();
      });
  }

  function onClickDetail(todo: TodoType) {
    navigate(`/task/${todo.id}`);
  }

  return (
    <Layout>
      <div className="px-1 md:px-24 lg:px-36 mt-3">
        <div className="rounded-2xl w-full flex flex-col p-6 bg-white dark:bg-gray-500 shadow-xl mb-16">
          <Input
            id="input-task"
            label="Insert a New Task"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
          />
          <Button
            label="Add Task"
            onClick={() => handleAddTask()}
            disabled={!inputTask}
          />
        </div>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded-2xl  mb-5 w-full bg-[#181D31] gap-4 flex flex-col p-6 "
          >
            <p
              className={todo.complete ? "line-through" : ""}
              onClick={() => onClickDetail(todo)}
            >
              <div className="text-clip overflow-hidden hover:cursor-pointer">
                {todo.content}
              </div>
            </p>
            <div className="flex gap-3  flex-col justify-end items-end">
              <Button label="Edit" onClick={() => onClickDetail(todo)} />
              <Button label="Delete" onClick={() => handleDeleteTask(todo)} />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
