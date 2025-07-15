import express from 'express';
import userRouter from './src/resources/users/user.routes.js';
import postRouter from './src/resources/posts/posts.routes.js';
import likesRouter from './src/resources/likes/likes.routes.js';
import commentsRouter from './src/resources/comments/comments.routes.js';
const app = express();
const port = 3000;


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);


app.listen(port, (err)=>{
  if(err){
    console.error(err);
  }
  console.log(`Application started at port ${port}`);
})