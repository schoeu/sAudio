(function($){
    jQuery.fn.extend({
        sAudio:function(option){
            this.append('<audio src="" id="s_ad" preload="auto"></audio>'
                    +'<div class="s_outLine" style="height: 52px;border: 1px solid #ebebeb;cursor: pointer;display: -webkit-box">'
                    +'<img style="width: 52px;height:41px;margin: 5px;" class="s_img"/>'
                    +'<div class="s_audioP" style="margin-top: 8px;display: -webkit-box;">'
                    +'<div class="s_ctrlBtn" style="height: 15px;width: 15px;padding: 10px;border-radius: 50%;background-color: rgb(202,21,52);margin-right: 8px;">'
                    +'<div class="s_plBtn" style="display: block;width: 0;height: 0;border-top: 7px solid transparent;border-left: 12px solid white;border-bottom: 8px solid transparent;margin-left: 4px;"></div><div class="s_psBtn" style="display: none;overflow: hidden;"><div class="s_cube" style="height: 15px;width: 3px;float: left;background-color: white;margin-left: 3px;"></div><div class="s_cube" style="height: 15px;width: 3px;float: left;background-color: white;margin-left: 3px;"></div></div></div>'
                    +'<div class="s_process" style="height: 2px;background-color: #D5D5D5;margin-top: 18px;">'
                    +'<div class="s_timeBar" style="width: 0px;height: 2px;background-color: rgb(202,21,52);"></div><div class="s_bar" style="height: 10px;width: 10px;background-color: #f2f2f2;position: relative;top: -6px;border-radius: 50%;box-sizing: border-box;border: 1px solid rgb(194, 194, 194);box-shadow: 0px 0px 1px #949494;"></div></div>'
                    +'<div class="s_tm" style="text-align: center;margin:0;"><p style="margin-top: 8px;"><span class="s_crtTime" style="display: inline-block;width: 35px;font-size: 12px;">00:00</span><span style="font-size: 12px;">/</span><span class="s_Dur" style="display: inline-block;width: 35px;font-size: 12px;">00:00</span></p></div></div></div>'
            );
            var s_ad = $('#s_ad')[0],
                s_ctrlBtn = $('.s_ctrlBtn')[0],
                s_plBtn = $('.s_plBtn')[0],
                s_psBtn = $('.s_psBtn')[0],
                s_Dur = $('.s_Dur'),
                s_crtTime = $('.s_crtTime')[0],
                s_bar = $('.s_bar')[0],
                s_process = $('.s_process')[0],
                s_timeBar = $('.s_timeBar')[0],
                s_img = $('.s_img'),
                s_tm = $('.s_tm')[0],
                s_outLine = $('.s_outLine')[0];
            if(option){
                $(s_ad).attr('src',option.src);
                s_img.attr("src",option.img);
            }else{
                console.log("请传入资源参数");
                return;
            }
            s_process.style.width = s_outLine.clientWidth-s_img[0].clientWidth-s_ctrlBtn.clientWidth-s_tm.clientWidth-19+"px";

            function s_audio(){}
            var myA = new s_audio();
            s_ad.addEventListener('timeupdate',function(){
                var ctPos = Math.floor(s_process.clientWidth / s_ad.duration*this.currentTime)+"px";
                s_crtTime.innerHTML = myA.parseTime(this.currentTime);
                s_bar.style.left = ctPos;
                s_timeBar.style.width = ctPos;
            });
            s_ad.addEventListener('loadedmetadata',function(){
                s_Dur.html(myA.parseTime(s_ad.duration));
            });
            s_audio.prototype.pPlay = function(){
                s_ad.play();
            };
            s_audio.prototype.pPause = function(){
                s_ad.pause();
            };
            s_audio.prototype.parseTime = function(t){
                var mTime = Math.floor(t/60);
                var sTime = Math.floor(t%60);
                var m = mTime<10?"0"+mTime:mTime;
                var s = sTime<10?"0"+sTime:sTime;
                return m+":"+s;
            };
            s_ctrlBtn.onclick = function(){
                var isPlay = s_plBtn.style.display;
                if(isPlay == "none"){
                    s_plBtn.style.display = "block";
                    s_psBtn.style.display = "none";
                    myA.pPause();
                }else{
                    s_plBtn.style.display = "none";
                    s_psBtn.style.display = "block";
                    if(s_ad.duration == s_ad.currentTime){
                        s_timeBar.style.width = "0px";
                        s_bar.style.left = "0px";
                        s_ad.currentTime = 0;
                    }
                    myA.pPlay();
                }
            };
        }
    });
})(jQuery);
