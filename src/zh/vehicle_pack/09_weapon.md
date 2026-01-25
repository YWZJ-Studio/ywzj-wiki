---
order: 9
icon: book
---

# 武器系统
YWZJ实现了一个基础的武器系统，其关联于一个武器单元进行运作

## 武器配置文件
一个武器配置文件对应一个独立武器，其存放于`data/tutorial/weapons/`
::: tip
武器配置文件名即是武器的唯一id，如`data/tutorial/weapons/qjt_5.8mm.json`例中，`qjt_5.8mm`就是武器在注册时的唯一id，是所有与它关联的数据的主键，如载具配置中`weapons`内的`id`参数
:::

## 武器的模板
与**载具模板**类似，武器也有模板概念，即**武器模板**，目前官方已实现了`枪炮`、`榴弹`、`火箭`、`航弹`、`导弹`、`热诱弹`武器模板，附属作者也可效仿追加新的武器模板类型

武器配置的`type`参数填写不同的枚举值以启用不同的武器模板
```
{
  "type": "ywzj_vehicle:cannon", # 武器模板
  "name": "QJT 5.8mm",
  ...
}
```

## 武器的配置
不同类型的武器体现于不同的**武器模板**，具备不同的配置

本文示例为`data/tutorial/weapons/qjt_5.8mm.json`
```
{
  "type": "ywzj_vehicle:cannon", # 枪炮类型
  "name": "QJT 5.8mm", # 武器名，可以是lang key
  "caliber": 7.62, # 口径 影响曳光大小
  "tracer_r": 0.7, # 曳光颜色 红
  "tracer_g": 0.5, # 曳光颜色 绿
  "tracer_b": 0.1, # 曳光颜色 蓝
  "damage": 8,
  "velocity": 16,
  "headshot_multiplier": 1.5,
  "shoot_interval": 80, # 自动射击时的间隔
  "max_capacity": 120, # 弹容量
  "reload": {
    "time": 100, # 装弹时间
    "ammo": "ywzj_vehicle:ammo_machine_gun" # 使用的弹药物品
  },
  "sounds": {
    "fire": "ywzj_vehicle:gun_7.62mm_shot",
    "reload": "ywzj_vehicle:gun_reload"
  }
}
```

## 武器单元
所有武器都需关联于一个**武器单元**的载具部件进行运作，一个**武器单元**可具备多个武器
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/weapon_unit.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">主炮塔具有多个武器，每个武器都有自己的部件与结构</p>
</div>

```
{
  "type": "ywzj_vehicle:tracked_vehicle",
  ...
  "parts": [
    {
      "id": "turret",
      "name": "turret",
      "type": "ywzj_vehicle:weapon", # 属于武器单元
      "structure_bone": "turret",
      ...
      "weapons": [
        "tutorial:cannon_125mm", # 主炮 关联于主炮塔部件，即本身
        {
          "id": "tutorial:qjt_5.8mm", # 同轴机枪
          "part_unit_id": "turret_machine_gun" # 关联于同轴机枪部件的id
        },
        {
          "id": "ywzj_vehicle:launcher_smoke_grenade", # 烟雾弹
          "part_unit_id": "turret_smoke_grenade" # 关联于烟雾弹部件的id
        }
      ]
    },
    {
      "id": "turret_machine_gun", # 同轴机枪部件
      "name": "turret_machine_gun",
      "type": "ywzj_vehicle:weapon", # 属于武器单元
      "structure_bone": "turret_machine_gun",
      "is_seat": false,
      "base": "turret",
      "rot_info": {
        "x_rot_speed": 1.5,
        "y_rot_speed": 0, # 同轴机枪自己不能水平转
        "x_rot_max": 5,
        "x_rot_min": -13
      }
    },
    {
      "id": "turret_smoke_grenade", # 烟雾弹部件
      "name": "turret_smoke_grenade",
      "type": "ywzj_vehicle:weapon", # 属于武器单元
      "structure_bone": "turret_smoke_grenade",
      "is_seat": false,
      "base": "turret",
      "rot_info": {
        "x_rot_speed": 0, # 烟雾弹只有固定角度，不能旋转
        "y_rot_speed": 0
      }
    },
...
```

## 弹药发射位置
一般来说，武器都会有**炮闩**与**炮口**的概念，炮弹会以炮闩指向炮口为方向，在炮口末端射出

在**结构模型**篇的[**分组与枢轴**](06_structure_model.md#分组与枢轴)中，我们提过武器单元有2个组，其中约定名为`部件名`的组是**座圈组**，名为`部件名_barrel`的组属于**炮管组**

而YWZJ会从炮管组中**自动解析炮闩与炮口位置**，在`部件名_barrel`中的**每一个块都会被视作一个炮管**，以其Z轴正方向上的末端为炮口，负方向上的末端为炮闩
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/barrels.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/barrels_in_structure.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">CS/SA5的导弹有两个发射架，所以导弹的炮管组有两个块</p>
</div>

::: tip
虽然武器单元规定有2个组，但CS/SA5的例子中，导弹发射架只有炮管组`turret_missile_barrel`，而没有座圈组`turret_missile`，这是考虑配置便捷性，没有座圈概念的武器单元**可以省略座圈组的配置**
:::