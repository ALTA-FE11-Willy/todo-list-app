import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";

interface Task {
  id?: number;
  content?: string;
}
interface Props {
  task: Task;
}

const DetailTask = () => {
  const task: Task = useParams();
  const [todo, setTodo] = useState<Task>({ content: "" });
  const [updated, setUpdated] = useState<boolean>(false);
  // const [newContent, setNewContent] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(`https://api.todoist.com/rest/v2/tasks/${task.id}`, todo, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        setUpdated(true);
      })
      .catch((err) => {
        alert(err.toString());
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://api.todoist.com/rest/v2/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TODO_API}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setTodo(res.data);
      })
      .catch((err) => {
        alert(err.toString());
      });
  }

  return (
    <Layout>
      <div className="flex h-full justify-center items-center content-center ">
        <form
          onSubmit={handleSubmit}
          className="w-[50rem] h-[30rem] bg-[#181D31] rounded-xl p-9 "
        >
          <textarea
            rows={12}
            value={todo?.content}
            onChange={(e) => setTodo({ ...todo, content: e.target.value })}
            className="w-full mb-3 rounded-xl p-4"
          />
          <div className="flex justify-end ">
            <Button type="submit" label="Update Tugas" />
          </div>
          {updated && <div>Tugas berhasil diperbarui</div>}
        </form>
      </div>
    </Layout>
  );
};

export default DetailTask;
