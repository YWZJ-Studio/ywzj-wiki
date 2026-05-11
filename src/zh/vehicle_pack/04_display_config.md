---
order: 4
icon: book
---

# 资产配置
以下讨论的是载具包的`assets`目录

## 客户端资产配置文件
资产配置文件记录了载具应该用什么模型、贴图、动画、脚本、音效来表现视听效果，一个载具可以有多个资产配置文件，以实现**皮肤系统**。

此外，武器与饰品的资产配置也存放于此

## DisplayId
资产配置文件名即是一份资产的唯一id，即**DisplayId**，如`assets/tutorial/display/vehicle/ztz99a.json`例中，`ztz99a`就是ZTZ99A默认使用的DisplayId

可以借助指令、皮肤工具物品等方式来让载具以不同的DisplayId进行展示
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/skin1.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/skin2.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">使用皮肤工具对载具切换DisplayId</p>
</div>


## 概览
在`assets/tutorial/display/vehicle`目录下新建`载具名.json`文件

本文示例为`assets/tutorial/display/vehicle/ztz99a.json`

相关资产应分门别类放入载具包对应文件夹，sounds.json追加音效的操作与原版数据包一致，不作赘述

::: tip
动画控制器文件存放于`assets/<命名空间>/animation_controllers/`目录，JS脚本存放于`assets/<命名空间>/scripts/`目录
:::

```
{
  "type": "ywzj_vehicle:tracked_vehicle",               # 使用履带式载具模板
  "model": "tutorial:entity/ztz99a",                    # 载具模型，存放于models/bedrock/entity/ztz99a.json
  "texture": "tutorial:textures/entity/ztz99a.png",     # 载具贴图，存放于textures/entity/ztz99a.png
  "slot_texture": "tutorial:textures/slot/ztz99a.png",  # 载具物品栏模型，存放于textures/slot/ztz99a.png
  "animations": "tutorial:entity/ztz99a.animation",     # 载具动画，存放于animations/bedrock/entity/ztz99a.animation.json
  "animation_controller": "tutorial:ztz99a_controller", # 载具动画控制器，存放于animation_controllers/ztz99a_controller.json
  "sounds": {                                           # 于sounds.json注册的音效
    "engine_start": "tutorial:ztz99a_engine_start",     # 发动机启动音效
    "engine_idle": "tutorial:ztz99a_engine_idle",       # 发动机待机音效
    "engine_run": "tutorial:ztz99a_engine_run",         # 发动机运转音效
    "engine_stop": "tutorial:ztz99a_engine_stop",       # 发动机关闭音效
    "passby": "tutorial:ztz99a_passby"                  # 通过音效（固定翼/旋翼专用）
  },
  "special_bone_effects": {                             # 特殊骨骼效果（可选）
    # 用于炮口焰、加力燃烧室等特殊效果
  },
  "description": "99式主战坦克（工程代号WZ-123）是中国人民解放军最新的主战坦克。\n与另一款较新的主战坦克96式相比，其制造成本与性能更高，它具备优异的防弹外型，其炮塔和车体均采用第三代复合装甲，是中国陆军集团军重型合成旅的主要突击力量，被称为中国陆战王牌。",
  "tab_index": 100,                 # 在载具包创造模式Tab页下的排序位置
  "track_config": {                 # 履带式载具专用配置，记录履带动画名、履带节长宽
    "left_track": "tread_l_move",
    "right_track": "tread_r_move",
    "module_length": 0.25,
    "track_width": 3.0
  }
}
```