---
order: 4
icon: book
---

# 资产配置
以下讨论的是载具包的`assets`目录

## 客户端资产配置文件
在`assets/tutorial/display/vehicle`目录下新建`载具名.json`文件，本文示例为`assets/tutorial/display/vehicle/ztz99a.json`
```
{
  "type": "ywzj_vehicle:tracked_vehicle",               # 使用履带式载具模板
  "model": "tutorial:entity/ztz99a",                    # 载具模型，存放于models/bedrock/entity/ztz99a.json
  "texture": "tutorial:textures/entity/ztz99a.png",     # 载具模型，存放于textures/entity/ztz99a.png
  "slot_texture": "tutorial:textures/slot/ztz99a.png",  # 载具物品栏模型，存放于textures/slot/ztz99a.png
  "animations": "tutorial:entity/ztz99a.animation",     # 载具动画，存放于animations/bedrock/entity/ztz99a.animation.json
  "script": "tutorial:ztz99a",                          # 载具动画脚本，存放于scripts/ztz99a.js
  "sounds": {                                           # 于sounds.json注册的音效
    "engine_start": "tutorial:ztz99a_engine_start",
    "engine_idle": "tutorial:ztz99a_engine_idle",
    "engine_run": "tutorial:ztz99a_engine_run"
  },
  "description": "99式主战坦克（工程代号WZ-123）是中国人民解放军最新的主战坦克。\n与另一款较新的主战坦克96式相比，其制造成本与性能更高，它具备优异的防弹外型，其炮塔和车体均采用第三代复合装甲，是中国陆军集团军重型合成旅的主要突击力量，被称为中国陆战王牌。"
}
```

相关资产应分门别类放入载具包对应文件夹

sounds.json追加音效的操作与原版数据包一致，不作赘述