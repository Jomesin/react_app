import os


dir_path = os.listdir(r"D:\redis")  # 文件数组
os.chdir(r"D:\redis")
for file in dir_path:  # 遍历所有文件
    if len(file.split(".")) == 2:  # 过滤掉特殊文件,例如redis.windows.conf文件,有2个点的
        file_name, file_extension = tuple(file.split("."))  # 分割文件名和文件后缀

        print(file)

        # if file_name == "商品名称的判断规则,例如MRO商品,图片文件以MRO_开头等等之类的;PS如果是调接口判断,建议全量传输":  # 如果是MRO上的商品
        if file_name == "server_log":  # 如果是MRO上的商品
            file_object = open(file_name, "rb")  # 打开文件获取文件对象
            """"上传文件至文件服务器"""
            """处理中"""
            """处理完成"""
            print("处理完成")
            file_object.close()  # 关闭文件,一定要关闭文件

        else:  # 如果不是MRO上的商品,如何处理,可以不写
            pass
