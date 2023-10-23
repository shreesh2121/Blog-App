import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useDispatch } from 'react-redux';
// import { fetchAllBlogs } from '../Redux/BlogSlice';

export default function BlogCard({blog}) {

  return (

 <Card key={blog.id} sx={{ maxWidth: 645 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.Title}
        subheader={`Created by ${blog.CreatedBy}`}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXJsfGVufDB8fDB8fHww&auto=format&fit=crop&w=1000&q=60"
        alt="Alternate image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {blog.Description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       
      </CardActions>

    </Card>

  );
}


