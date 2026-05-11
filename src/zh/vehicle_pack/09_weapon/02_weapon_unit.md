---
order: 2
icon: book
---

# 武器单元

武器单元是一种**载具部件**（type 为 `ywzj_vehicle:weapon`），所有武器都需关联于一个武器单元才能运作。

一个武器单元可具备多个武器，一个武器只能与一个武器单元关联。

<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="/images/weapon_unit.png" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center; gap: 10px;">
  <p style="margin-top: 10px; font-size: 13px">主炮塔具有多个武器，每个武器都有自己的部件与结构</p>
</div>

## 武器与武器单元的关联

在载具的部件配置中，主武器单元的 `weapons` 列表可以直接填写武器ID，也可以通过 `part_unit_id` 引用其他部件上的武器：

```json
"parts": [
  {
    "id": "turret",
    "name": "turret",
    "type": "ywzj_vehicle:weapon",
    "structure_bone": "turret",
    ...
    "weapons": [
      "tutorial:cannon_125mm",                        // 主炮，关联于当前部件
      {
        "id": "tutorial:qjt_5.8mm",                   // 同轴机枪
        "part_unit_id": "turret_machine_gun"           // 关联于同轴机枪部件
      },
      {
        "id": "ywzj_vehicle:launcher_smoke_grenade",   // 烟雾弹
        "part_unit_id": "turret_smoke_grenade"          // 关联于烟雾弹部件
      }
    ]
  },
  {
    "id": "turret_machine_gun",
    "name": "turret_machine_gun",
    "type": "ywzj_vehicle:weapon",
    "structure_bone": "turret_machine_gun",
    "is_seat": false,           // 同轴机枪不是乘位
    "rot_info": {
      "x_rot_speed": 1.5,
      "y_rot_speed": 0,         // 同轴机枪跟随炮塔水平转动，不自转
      "x_rot_max": 5,
      "x_rot_min": -13
    }
  }
  ...
]
```

## 弹药发射位置

武器有**炮闩**与**炮口**的概念，炮弹以炮闩指向炮口为方向，在炮口末端射出。

### 自动解析

YWZJ会从结构模型的炮管组中**自动解析炮闩与炮口位置**：

- 武器单元需在结构模型中有对应的组：座圈组命名为 `部件名`，炮管组命名为 `部件名_barrel`
- 炮管组中的**每一个块都被视作一个炮管**
- 以块的 Z轴正方向末端为**炮口**，Z轴负方向末端为**炮闩**

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
没有座圈概念的武器单元（如导弹发射架）可以**省略座圈组**的配置，只需炮管组 `部件名_barrel`。
:::

## 武器单元的自带旋转

按照资产准备的约定，部件在**三轴旋转都为0时，朝向Z轴正方向**。但当武器不指向载具正方向时（如AC-130的侧方航炮），需要在结构模型的座圈组与炮管组设置**自带旋转**：

- 座圈组设置 **Y轴** 自带旋转
- 炮管组设置 **X轴** 自带旋转

<div style="text-align: center;">
  <div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/images/self_rot0.png" style="width: 45%;">
    <img src="/images/self_rot1.png" style="width: 45%;">
  </div>
  <p style="margin-top: 10px; font-size: 13px">AC-130的侧方航炮在结构模型的座圈组中有90度的自带旋转</p>
</div>

### 配置示例

AC-130侧方航炮的武器单元配置，座圈组在结构模型中有 +90度的Y轴自带旋转：

```json
{
  "id": "105mm_cannon",
  "name": "105mm_cannon",
  "type": "ywzj_vehicle:weapon",
  "structure_bone": "gun2",
  "optical_sight_type": "crt",
  "crosshair_style": "circle",
  "seat_offset": [0, 3, 5],
  "optical_sight_offset": [-0.5, 0.1, 1.2],
  "operator_on_weapon_unit": false,
  "rot_info": {
    "x_rot_speed": 8,
    "y_rot_speed": 8,
    "x_rot_min": -15,
    "x_rot_max": 20,
    "y_rot_min": -105,    // -90 - 15（注意基岩模型与载具对Y轴旋转约定相反）
    "y_rot_max": -75      // -90 + 15
  },
  "weapons": [
    "dragonrise_reforge_ywzj:cannon_105mm"
  ]
}
```

::: warning
基岩模型中的Y轴旋转方向与载具中约定相反，设置旋转角度时需要注意符号。
:::
