const fs = require('fs');
const xml = require('xml2js');
const parser = xml.Parser();

const fileController = {
    getJson(req, res) {
        fs.readFile('./fileData/data.json', 'utf-8', (err, result) => {
            console.log(result);
            res.json(result);
        })
    },
    getRandomJocke(req, res) {
        let jockes = [
            '为什么人结婚都要先好日子？因为结了婚之后都没有好日子',
            '女穿着貂皮大衣走在街上，从后面跑来一男子，将其大衣扒下，接着给她一记耳光，怒曰：“这么贵的玩意，不让你买，你非要买！”然后转身扬长而去。街上众人皆以为是夫妻，该女原地发蒙良久，大叫：“抢劫啊！”',
            '妻子：“每次我唱歌的时候，你为什么总要到阳台上去？” 丈夫：“我是想让大家都知道，不是我在打你。”',
            '蝙蝠深爱麻雀，却被拒绝，蝙蝠：“为什么，这一切都是为什么？” 麻雀：“俺妈说了，长得黑也就算了，总爱晚上出去的男人都不是好鸟！”',
            '病人很担心自己的脑袋。经X光检查后，他问医生：“我的脑部有什么吗？” 医生：“什么也没有。” 病人：“啊，真的这么严重？”',
            '大学时，一次老师让填一份很重要的表格，而且声明每人一张，没有富余的，不能涂改。一哥们上来就填，结果发现把民族“汉”填到了性别栏内，因为说了不让涂改，想了想，很NB地在“汉”后面加了个“子”字。',
            '农夫买了一盒耗子药，耗子吃了之后大摇大摆的走了。 农夫找到药店老板，老板说要抓到耗子用温水送服。 农夫照做，耗子照走不误。农夫又找到老板，老板问：“你喂了几次？” 农夫答：“一次”。老板说：“你看下说明书，6盒一疗程”。',
            '我一大学同学毕业后搞了一年营销，发奋考上公务员，分到民政局婚姻登记处，头天上班，一大早就来了对新人登记，那男的客气，给了一包烟和一包糖，同学很激动，麻利的办好手续，起身握手送别，很有礼貌地说了句：欢迎下次再来。',
            '女：明天是我生日，你送我什么礼物？ 男：和去年一样。 女：去年你送我什么？ 男：和前年一样。 女：前年是送什么呢？ 男：前年我不认识你，所以什么也没送。',
            '一朋友二胎喜得一子，找大师给自己儿子取名！ 朋友：“大师，我要给儿子取名，要有中文和英文名，最好再有个小名，我姓陆！大师：这太简单了！中文名叫 : 陆由器英文名叫 : Wi-Fi小名就叫 : 猫儿'
        ];

        let i = Math.floor(Math.random() * jockes.length);

        res.send(jockes[i]);
    },
    getXML(req,res){
        fs.readFile('./fileData/data.xml','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }
            res.header('content-type','application/xml');
            res.end(data);
        })
    },
    downloadFile(req,res){
        fs.readFile(__dirname + '/../static/images.zip',(err,data)=>{
            if(err) console.log(err);
            res.send(data);
        });
    }
};

module.exports = fileController;