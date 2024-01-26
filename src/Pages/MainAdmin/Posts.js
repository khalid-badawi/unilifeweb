import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import PostCard from "../../Components/Main Admin/PostCard";
// import DateSelector from "../../Components/Main Admin/DateSelector";
import Search from "../../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import { getLatsPosts, searchPost } from "../../APIS/adminAPI";
import { setPosts } from "../../slice/admin";
import { setError } from "../../slice/user";

export default function Posts() {
  const posts = useSelector((state) => state.admin.posts);
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const res = await getLatsPosts(id);
      console.log(res);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        dispatch(setPosts(data));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403 || status === 500) {
          dispatch(setError(message));
        }
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    /* async function fetchData() {
      const res = await searchPost(id);
      console.log(res);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        dispatch(setPosts(data));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403 || status === 500) {
          dispatch(setError(message));
        }
      }
    }
    fetchData();*/
  }, []);
  return (
    <Box height="90%" sx={{ overflowY: "scroll", pt: 1 }}>
      <Box sx={{ ml: 2, mb: 2, display: "flex", flexDirection: "row" }}>
        <Search />
        {/* <Box ml={1}>
          <DateSelector label="Posted On" value={date} setValue={setDate} />
        </Box> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pr: 3,
        }}
      >
        {posts.map((post) => (
          <PostCard data={post} key={post.id} />
        ))}
      </Box>
    </Box>
  );
}
