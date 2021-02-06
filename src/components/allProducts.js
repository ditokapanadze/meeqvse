import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useParams
  } from "react-router-dom";
  const useStyles = makeStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 400,
      },
    });
  

let AllProducts = () =>{
    const [products, setProducts] = useState([])
    const classes = useStyles();
    const params = useParams()
    let page = params.page || 1
    let history = useHistory()
    page = parseInt(page);
    const [totalPosts, setTotalPosts] = useState();
    let limit = 8
    const totalPages = Math.ceil(totalPosts / limit);

useEffect(()=>{
    axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/products',{
      params: {
        _page: page,
        _limit: 8
      }
    })
    .then(res =>{ 
        setTotalPosts(res.headers['x-total-count']);
        setProducts(res.data)
        console.log(res)
    })
    .catch(error => console.log(error))
}, [page])

let Buttons = () =>{
  return(
    <div>
<button onClick={() =>history.push('/AllProducts/'+ (page - 1))} disabled={page <= 1} >previess page</button>
 <button onClick={() =>history.push('/AllProducts/'+ (page + 1))} disabled={page >= totalPages}  >next page</button>
 </div>
  )
}

return (
    <div>
        {products.map(item =><div key={item.id} className="sacdeli"><Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image={item.image}
      title="Contemplative Reptile"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
       {item.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <h4>{item.description.split(' ').splice(0, 30).join(' ')+'...'}</h4>
        <br/>
        <p>Price:{item.price}$</p>
      </Typography>
    </CardContent>
  </CardActionArea>
  <CardActions>
  <Button 
   component={Link}
   to= {'/products/show/' + item.id}   
  variant="contained" 
  color="primary">
       Learn More
   </Button>
  </CardActions>
</Card> 
</div>
)}
<Buttons></Buttons>

</div>
)}

export default  AllProducts