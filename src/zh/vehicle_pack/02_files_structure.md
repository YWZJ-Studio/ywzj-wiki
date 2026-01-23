---
order: 2
icon: book
---

# 载具包结构

## 参考文件结构
本教程中使用`tutorial`作为命名空间
你可以参考以下这个结构来组织你的载具包文件，但需要取一个自己的命名空间
```
─tutorial_vehicle_pack
├─assets
│  └─tutorial # 命名空间
│      ├─animations  # 动画，如履带运动
│      ├─display     # 载具客户端表现的总配置
│      ├─lang        # 语言
│      ├─models      # 模型
│      ├─scripts     # 动画脚本，描述程序性动画：如炮塔转动
│      ├─sounds      # 音效
│      └─textures    # 贴图
├─data
│   └─tutorial # 命名空间
│      ├─models     # 服务端模型，如解析OBB用的结构基岩模型
│      ├─recipes    # 载具合成表
│      ├─vehicles   # 载具总配置
│      └─weapons    # 武器配置
│
├─pack.png                # 载具包在资源包中展示的图片
└─vehicle_pack.meta.json  # 载具包元数据
```

## 元数据
vehicle_pack.meta.json文件包含了载具包的基本识别信息，其中`title`于`description`可填写语言文件的lang key
```
{
    "namespace": "tutorial", # 命名空间必须填写正确
    "title": "教程用载具包",
    "description": "Tutorial Vehicle Pack",
    "version": "1.0.0",
    "date": "2026-01-01",
    "license": "All Rights Reserved",
    "authors": ["YWZJ"],
    "url": "https://github.com/YWZJ-Studio",
    "dependencies": {}
}
```

## 自动Tab
正确识别到载具包后，客户端会自动注册一个创造模式Tab页来罗列其内载具的刷怪蛋
放置于`assets/tutorial/textures/tab.png`的文件将作为该页的物品图标
::: center
![自动注册的Tab](/images/tab.png)
:::