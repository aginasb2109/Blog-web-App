import express from "express";
import bodyParser from "body-parser";


const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const articles=[{
    title:"Insights from Michelle Obama’s Memoirs",

    date:new Date(),
    description:"Michelle Obama’s books, Becoming and The Light We Carry, offer profound reflections on resilience, growth, and empowerment. These works reveal not just her life story, but also lessons that resonate universally. Here's a deep dive into the wisdom shared by the former First Lady.",
    markdown:`Michelle Obama’s, Becoming The Light We Carry, are reflections resilience, identity, growth, offering both glimpse life universal lessons inspire readers walks life. In Becoming, chronicles journey South Side Chicago White House, sharing joys challenges navigating roles student, professional, wife, mother, eventually First Lady United States. Her story testament power hard work, self-belief, courage challenge societal expectations. She speaks candidly struggles self-doubt, pressure being public eye, importance finding using one’s voice create meaningful change.

In The Light We Carry, expands ideas, offering toolkit building resilience thriving uncertain times. reflects embracing vulnerability lead strength, urging readers acknowledge imperfections stepping stones growth. Michelle emphasizes importance fostering connections—whether family, friendships, mentorship—relationships serve source support inspiration. She highlights necessity self-care, sharing personal habits knitting journaling help maintain balance focus. experiences, teaches us growth lifelong process, moments triumph setbacks, shape who.

Together, memoirs beyond personal storytelling become guide perseverance, self-discovery, empowerment. Michelle Obama’s words resonate anyone striving overcome challenges, build meaningful lives, leave impact world. remind us success isn’t about perfection about learning, evolving, carrying unique light forward, matter difficult journey may seem.

`,
    
},
{
    title:"Empowering Women in India: Bridging Tradition and Progress",
    date:new Date(),
    description:"Women in India are at the forefront of a transformative journey, balancing cultural heritage with modern aspirations. This blog explores their evolving roles, challenges, and contributions to shaping the nation's future.",
    markdown:` Women in India embody resilience and determination, navigating a unique blend of tradition and modernity. From ancient times to today, they have played pivotal roles in society, shaping families, communities, and the nation's identity. Despite facing challenges like gender inequality, limited access to education, and societal stereotypes, their journey continues to inspire.

One of the key turning points has been the increasing emphasis on education and financial independence. Schemes like Beti Bachao Beti Padhao have been instrumental in improving literacy rates and empowering young girls to dream big. Women like Kalpana Chawla, Sudha Murthy, and Arunima Sinha have become symbols of what can be achieved when determination meets opportunity.

However, the journey isn’t without hurdles. Rural areas still face issues such as child marriage and a lack of access to healthcare. Many women encounter a glass ceiling in corporate and political spaces. Yet, grassroots movements led by women in villages and towns are breaking these barriers, showing how change can begin at the community level.

Self-help groups, vocational training programs, and entrepreneurial initiatives have allowed women to become financial contributors, breaking stereotypes and gaining respect. The rise of technology has further opened avenues, with women excelling in STEM, digital startups, and innovation.

Cultural progress is equally crucial. Films, books, and art by Indian women are challenging outdated norms and promoting the idea that equality doesn’t erase culture but enriches it.

Ultimately, empowering women in India is not just about individual growth but about societal transformation. When women succeed, families prosper, communities thrive, and the nation progresses. Their stories are a reminder that India’s future is brighter when its women are given the tools, respect, and opportunities they deserve.`

}]


app.get("/",(req,res)=>{
    res.render("index.ejs", {
        articles:articles
    });
})



app.post("/", (req, res) => {
    const articleId = req.body.id ? parseInt(req.body.id) : null; 
    if (articleId !== null && articles[articleId]) {
      
        articles[articleId] = {
            title: req.body.title,
            date: new Date(),
            description: req.body.description,
            markdown: req.body.markdown,
        };
    } else {
        
        const article = {
            title: req.body.title,
            date: new Date(),
            description: req.body.description,
            markdown: req.body.markdown,
        };
        articles.push(article);
    }
    res.redirect("/");
});



  app.get("/show/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles[articleId];
    if (!article) {
        return res.status(404).send("Article not found");
    }
    res.render("show.ejs", { article });
});

app.post("/delete/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    if (!articles[articleId]) {
        return res.redirect("/"); 
    }
    articles.splice(articleId, 1);
    res.redirect("/");
});

app.get("/post", (req, res) => {
    res.render("post.ejs", { article: {}, id: "", isEdit: false }); 
});

app.get("/edit/:id", (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles[articleId];
    if (!article) {
        return res.status(404).send("Article not found");
    }
    res.render("post.ejs", { article, id: articleId, isEdit: true }); 
});



app.get("/about", (req,res)=>{
    res.render("about.ejs");
})

app.get("/login", (req,res)=>{
    res.render("login.ejs");
})
app.listen(port,()=>{
    console.log(`Successfully running on server ${port}`);
});

