
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


let ProductPage = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const params = useParams()
    const [product, setProduct] = useState([])
    const [review, setReview] = useState([])
    
    useEffect(()=>{
        axios.get('https://us-central1-js04-b4877.cloudfunctions.net/api/products/' + params.id)
        .then(res =>setProduct(res.data))
    }, [])
    useEffect(()=>{
        axios.get(`https://us-central1-js04-b4877.cloudfunctions.net/api/products/${params.id}/reviews`)
        .then(res =>setReview(res.data))
    }, [])

    return(
        <div>
            <img src={product.image}></img>
            <div>{product.description}</div>
            <br />
            {review.map(item =>(
                <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Reviews
                  </Typography>
                 <Typography variant="body2" component="p">
                 {item.body}
                  </Typography>
                </CardContent>
                </Card>
            ))}
          
        </div>
    )
}

export  default ProductPage