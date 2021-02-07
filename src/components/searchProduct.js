import axios from 'axios';
import React, {useEffect, useState } from 'react'
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
    useParams
  } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

  let FoundProducts = () =>{
      const [foundProducts, setFoundProducts] = useState([])
    let { param } = useParams();
    const classes = useStyles();

    useEffect(()=>{
            axios.get(`https://us-central1-js04-b4877.cloudfunctions.net/api/products?q=${param}`)
            .then(res => {
                setFoundProducts(res.data)
                console.log(res.data) 
                })
        },[foundProducts])
    console.log(param)
    if(foundProducts.length === 0){
      return(
        <div>Product not found</div>
      )
    }  
    
    return(
        <div>
          
        {foundProducts.map(item =><div key={item.id} className="sacdeli"><Card className={classes.root}>
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
  </Card> </div>)}
  
  </div>
      )
  }

  export default  FoundProducts