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
        

"""" 分行正则撰写  """
import os
import re


# 该正则为，匹配中英文括号的内容，然后依据不同的模式匹配不一样
regex = re.compile(r"[(|（](.*?)[)|）]")  # 创建正则对象

filenames = os.listdir(r"D:\DownloadPackage\test")  # 获取该目录
# 模式match从头匹配，不可选用，模式findall可以用,但是后面提取会很麻烦,模式search搜索中英文圆括号的内容
# [1:-1]截取掉圆括号,转换数据类型
filenames.sort(key=lambda x: int(regex.search(x).group(0)[1:-1]), reverse=True)  # True为倒序，False为倒序
print(filenames)


"""" 分行,优化多进程 """"
# -*- coding:utf-8 -*-
#!/usr/bin/env python
# Author: JISO
# Email: 747142549@qq.com
# File: pic_optimize.py
import multiprocessing
import os
import pandas as pd


def file_processing(folder_path):
    """
    文件处理函数,传入要处理目录的目标路径
    D:\\DownloadPackage
    :param folder_path: 文件夹路径
    :return: DataFrame对象
    """

    file_name_list = os.listdir(folder_path)  # 获取该目录
    f_df = pd.DataFrame({"file_name": file_name_list})
    f_df["goods_name"], f_df["file_index"], f_df["file_extension"] = f_df["file_name"].str\
        .split("[(|（]([0-9]*?)[)|）]").str
    f_df["file_index"] = f_df["file_index"].astype("int")
    
    # # 进行分组排序,按照商品名称进行分类,
    # df = df.groupby("goods_name", sort=False) \
    #     .apply(lambda x: x.sort_values("file_index", ascending=True)) \
    #     .reset_index(drop=True)
    return df
    
    
def main():
    pass


if __name__ == '__main__':
    # 创建5个进程,如果处理任务大于进程数量,那么处理任务会等待子进程释放
    pool = multiprocessing.Pool(processes=5)
    
    # 获取要处理的DataFrame对象
    df = file_processing(r"D:\DownloadPackage\test")
    
    # 遍历分组
    for goods_name, group in df.groupby("goods_name", sort=False):
        # 提取所有包含该商品名称的数据,返回DataFrame对象
        goods_df = df[df["goods_name"] == goods_name]

        # 子进程开启异步非阻塞模式
        pool.apply_async(main, (goods_df, ))

    # 关闭进程池,不在接受新任务
    pool.close()
    # 阻塞主进程
    pool.join()

    print("处理完成")


