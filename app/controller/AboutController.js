

class AboutController{

    async about(req,res){
        res.render('about',{
            title:"about page"
        })
    }
}

module.exports = new AboutController()