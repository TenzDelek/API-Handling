import express from 'express'

const app=express()

app.get('/api/products',(req,res)=>{
    const products=[
        {
            id:1,
            name:'roof house',
            price:200,
            image:'https://images.pexels.com/photos/925684/pexels-photo-925684.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
        },
        {
            id:2,
            name:'Beach view',
            price:250,
            image:'https://images.pexels.com/photos/19966316/pexels-photo-19966316/free-photo-of-bi-n.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
        },
        {
            id:3,
            name:'Sign Board',
            price:400,
            image:'https://images.pexels.com/photos/18275721/pexels-photo-18275721/free-photo-of-shadow-of-a-traffic-sign.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
        },
        {
            id:4,
            name:'Houses',
            price:600,
            image:'https://images.pexels.com/photos/14801446/pexels-photo-14801446.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
        },
        {
            id:5,
            name:'Green Grass',
            price:200,
            image:'https://images.pexels.com/photos/12730085/pexels-photo-12730085.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
        },
    ]
    //if a url contain ? it is queryone
    //http://localhost:3000/api/products?search=Houses
    if(req.query.search){
        const filterproduct=products.filter(product=>product.name.includes(req.query.search))
        res.send(filterproduct)
        return;//or else it will crash
    }
    setTimeout(()=>{
        res.send(products)
    },3000)
    
})

const port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})