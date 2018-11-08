var fs = require('fs');
var path = require('path');
var url = require('url');
var exec = require('child_process').exec;

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('./');

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile && filename.indexOf('.html')>=0){
                            // console.log(filedir);
                            handle(filedir, filePath, filename);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

// var begin = 'https://rawgit.com/emn178';
// var end = '"';
// function handle(filedir, filePath, filename, next){
//     fs.readFile(filedir, {encoding:"utf-8"}, function(err, str){
//         var beginIndex = str.indexOf(begin);
//         if(beginIndex>0){
//             var endIndex = str.indexOf(end, beginIndex+begin.length) + end.length;
//             var urltxt = str.substring(beginIndex, endIndex-1);
//             var newtxt = '_js/'+url.parse(urltxt).pathname.split('/').pop();
//             console.log(newtxt);
//             str = str.replace(urltxt, newtxt);

//             fs.writeFile(filedir, str, {flag: 'w'}, function (err) {
//                 if(err) {
//                  console.error(err);
//                  } else {
//                     console.log(filedir, '写入成功');
//                  }
//             });
//         }
//     });
// }

// var befor = 'https://code.jquery.com/jquery-1.10.1.min.js';
// var after = 'https://cdn.bootcss.com/jquery/1.10.1/jquery.min.js';
// function handle(filedir, filePath, filename, next){
//     fs.readFile(filedir, {encoding:"utf-8"}, function(err, str){
//         str = str.replace(befor, after);
//         fs.writeFile(filedir, str, {flag: 'w'}, function (err) {
//             if(err) {
//              console.error(err);
//              } else {
//                 console.log(filedir, '写入成功');
//              }
//         });
//     });
// }

var befor = `ga('send', 'pageview');`;
function handle(filedir, filePath, filename){
    fs.readFile(filedir, {encoding:"utf-8"}, function(err, str){
        str = str.replace(befor, '');
        fs.writeFile(filedir, str, {flag: 'w'}, function (err) {
            if(err) {
                console.error(err);
                } else {
                console.log(filedir, '写入成功');
                }
        });
    });
}

// function wget
// Function to download file using wget  
var DOWNLOAD_DIR = './_js';
function wget(file_url) {  
    // extract the file name  
    var file_name = url.parse(file_url).pathname.split('/').pop();  
    // compose the wget command  
    var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url;  
    // excute wget using child_process' exec function  
    var child = exec(wget, function(err, stdout, stderr) {  
        if (err) throw err;  
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);  
    }); 
};  

// wget('https://rawgit.com/emn178/hi-base64/master/build/base64.min.js');