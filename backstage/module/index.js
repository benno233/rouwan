var common=require(__dirname+'/../lib/common.js');
var os=require('os');

exports.run=function(req,res){
	rw.sess.start(req,res);
	if(!common.checkAuth(req,res)){
		req=null;
		res=null;
		return;
	}
	var t=rw.util.s2t(process.uptime());
	var up=t[0]+'d '+t[1]+'h '+t[2]+'m '+t[3]+'s';
	t=rw.util.s2t(os.uptime());
	var osup=t[0]+'d '+t[1]+'h '+t[2]+'m '+t[3]+'s';
	var lav=os.loadavg();
	lav[0]=lav[0].toFixed(2);
	lav[1]=lav[1].toFixed(2);
	lav[2]=lav[2].toFixed(2);
	var tthi='';
	if(!rw.config.backstage.switch.timetag){
		tthi=' class="hide"';
	}
	rw.http.zout(
		rw.t.render(
			__dirname+'/../template/page.html',{'LINK':'<script type="text/javascript" src="./js/index.js?sp=2"></script><script type="text/javascript" src="./js/ace/ace.js?sp=3"></script><link href="./css/index.css?sp=2" rel="stylesheet" type="text/css" />','MCUR1':' cur','V':rw.config.version,'WRAPPER':rw.t.render(__dirname+'/../template/index.html',{'TTHI':tthi,'NV':process.version,'PID':process.pid,'TITLE':process.title,'MEM':parseInt(process.memoryUsage().rss/1024/1024)+' MB','MEMP':Math.ceil(process.memoryUsage().rss*100/os.totalmem())+'%','SMEM':parseInt(os.totalmem()/1024/1024)+' MB','UP':up,'LAV':lav.join(', '),'FRM':parseInt(os.freemem()/1024/1024)+' MB','OSUP':osup,'OID':'rw.session.'+req.session.sid})}
		),
		req,
		res
	);
	req=null;
	res=null;
	t=null;
	up=null;
	lav=null;
	osup=null;
};