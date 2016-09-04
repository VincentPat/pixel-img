(function() {
    window.toPixelImg = function(img, ratio) {
        // 创建canvas
        var canvas = document.createElement("canvas");
        // 设定宽高
        canvas.width = img.width;
        canvas.height = img.height;
        // 绘制图片
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // 像素化处理
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < imgData.data.length; i += 4) {
            var index = i/4;
            var row = Math.floor(index/img.width);
            var col = index%img.width;

            if (row%ratio == 0 && col%ratio == 0) { // 复制的格子
                // console.log(row, col);
            } else {
                var _index = index - (img.width * (row%ratio)) - (col%ratio);
                for (var j = 0; j < 4; j++) imgData.data[i+j] = imgData.data[_index*4+j];
            }
        }
        ctx.putImageData(imgData, 0, 0);
        return canvas.toDataURL();
    }
})();