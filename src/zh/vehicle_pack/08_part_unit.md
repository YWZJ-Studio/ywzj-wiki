---
order: 8
icon: book
---

# 载具部件
载具部件是对附着于车体上的所有功能模块的抽象。我们把座位、炮塔、雷达、车斗等等可受玩家控制的载具模块都视作载具部件，它们都具有独立的OBB解构

## 载具部件的模板
与**载具模板**类似，载具部件也有模板概念，即**部件模板**，目前官方已实现了`通用`、`可旋转`、`武器站`、`自动武器站`、`雷达`部件模板，附属作者也可效仿追加新的部件模板类型

在载具配置的部件配置`parts`中配置各个部件，部件配置中的`type`参数填写不同的枚举值以启用不同的部件模板
```
...
"parts": [
    {
      "id": "turret",
      "name": "turret",
      "type": "ywzj_vehicle:weapon", # 部件模板
      "structure_bone": "turret",
      ...
```
| 模板名   |    type     | 释义                    |
|:------|:-----------:|:----------------------|
| 通用    |   ywzj_vehicle:generic   | 没有特殊功能的部件，如玩家座位       |
| 可旋转   |  ywzj_vehicle:rotatable  | 会转动的部件，如泥头车的车斗        |
| 武器站   |   ywzj_vehicle:weapon    | 可具备武器，有两个枢轴的可旋转部件     |
| 自动武器站 | ywzj_vehicle:auto_weapon | 和武器站类似，但可以自动瞄准开火      |
| 雷达    |    ywzj_vehicle:radar    | 转动和扫描一定范围内的实体，使武器站能锁定 |

## 载具部件的组织
载具部件之间可能存在**联动关系**，比如车长机枪附着于主炮塔上，主炮塔转动会带动车长机枪运动；又比如直升机的光瞄摄像机指向某个位置，炮塔也将瞄准该位置
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/part_units1.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">机枪被主炮塔带动</p>
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/part_units2.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">光瞄指挥机炮瞄准</p>
</div>
载具配置中有多种表达载具部件组织关系的方式

- **附着关系** 
空间上B会因A的移动而受限移动，如炮塔叠罗汉
- **武器联动关系**
A瞄准某位置，B也试图瞄准该位置，如战舰多炮塔
- **父子关系**
A拥有B这个部件，如泥头车的车斗、防空车的雷达

这些关系是可以同时存在的，比如主炮塔上若有一个联动小炮塔，那这个小炮塔既有附着关系，即主炮塔转动导致小炮塔发生移动，又有武器联动关系，即小炮塔会试图瞄准主炮塔瞄准的位置

### 附着关系
```
...
    {
      "id": "commander_machine_gun",
      "name": "commander_machine_gun",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "commander_machine_gun",
      "seat_offset": [0.5, 2.5, 0.275],
      "operator_on_weapon_unit": false,
      "base": "turret", # 车长机枪附着于主炮塔上
      "rot_info": {
...
```

### 武器联动关系
```
...
"parts": [
    {
      "id": "sighting_system",
      "name": "sighting_system",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "sighting_system",
      ...
      "optical_sight_type": "crt",
      "zoom_max": 12,
      "weapons": [
        {
          "id": "ywzj_vehicle:auto_cannon", # 光瞄联动控制机炮炮塔
          "part_unit_id": "auto_cannon"
        },
        {
          "id": "ywzj_vehicle:missile",
          "part_unit_id": "missile"
        },
        {
          "id": "ywzj_vehicle:rocket",
          "part_unit_id": "rocket"
        },
        {
          "id": "ywzj_vehicle:decoy_flare",
          "part_unit_id": "decoy_flare"
        }
      ]
    },
    {
      "id": "auto_cannon", # 机炮炮塔
      "name": "auto_cannon",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "auto_cannon",
      "fire_control_sensor_type": "eo",
      "fire_control_lock_type": "aim_hit",
      "is_seat": false,
      "crosshair_style": "square",
      "rot_info": {
        "x_rot_speed": 3,
        "y_rot_speed": 3,
        "x_rot_max": 45,
        "x_rot_min": -13,
        "y_rot_max": 90,
        "y_rot_min": -90
      }
    }
...
```

### 父子关系
```
...
  "parts": [
    {
      "id": "turret",
      "name": "turret",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "turret",
      ...
      "optical_sight_type": "crt",
      "zoom_max": 12,
      "sub_part_unit_ids": ["radar"], # 主炮塔可以控制雷达
      ...
    },
    {
      "id": "radar",  # 雷达
      "name": "radar",
      "type": "ywzj_vehicle:radar",
      "structure_bone": "radar",
      "is_seat": false,
      "base": "turret", # 雷达也附着于炮塔上
      "rot_info": {
        "x_rot_speed": 0,
        "y_rot_speed": 15,
        "x_rot": -45
      },
      "scan_sector_angle": 80,
      "max_distance": 256
    }
...
```