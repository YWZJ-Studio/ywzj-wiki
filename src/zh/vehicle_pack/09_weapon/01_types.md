---
order: 1
icon: book
---

# 武器类型

不同类型的武器体现于不同的**武器模板**，具备不同的配置。

## 枪炮 (cannon)

直射火力，发射子弹/炮弹。适用于机枪、机关炮、坦克主炮等。

```json
{
  "type": "ywzj_vehicle:cannon",
  "name": "QJT 5.8mm",
  "caliber": 7.62,
  "tracer_r": 0.7,
  "tracer_g": 0.5,
  "tracer_b": 0.1,
  "damage": 8,
  "velocity": 16,
  "headshot_multiplier": 1.5,
  "recoil": 0,
  "inaccuracy": 0,
  "shoot_interval": 80,
  "max_capacity": 120,
  "reload": {
    "time": 100,
    "ammo": "ywzj_vehicle:ammo_machine_gun"
  },
  "explosion": {
    "explode": true,
    "damage": 100,
    "radius": 4,
    "destroy_block": false
  }
}
```

| 字段 | 类型 | 说明 |
|:----|:----|:----|
| `caliber` | float | 口径（mm），影响曳光大小 |
| `tracer_r/g/b` | float | 曳光颜色（RGB，0~1） |
| `damage` | float | 单发伤害 |
| `velocity` | float | 弹丸初速 |
| `headshot_multiplier` | float | 爆头伤害倍率 |
| `recoil` | float | 后坐力强度 |
| `inaccuracy` | float | 散布值 |
| `shoot_interval` | int | 自动射击间隔（毫秒） |
| `max_capacity` | int | 弹容量 |
| `reload.time` | int | 装弹时间（tick） |
| `reload.ammo` | item ID | 装填消耗的弹药物品 |
| `explosion.explode` | bool | 弹丸命中后是否爆炸 |
| `explosion.damage` | float | 爆炸伤害 |
| `explosion.radius` | float | 爆炸半径 |
| `explosion.destroy_block` | bool | 爆炸是否破坏方块 |

`explosion` 字段是可选的。普通机枪子弹不需要填写，坦克主炮等大口径武器可通过此字段使炮弹命中后产生爆炸效果。

## 导弹 (missile)

制导武器，具备追踪目标或飞向预设坐标的能力。

```json
{
  "type": "ywzj_vehicle:missile",
  "name": "PL-12",
  "damage": 100,
  "shoot_interval": 1000,
  "max_capacity": 6,
  "x_rot_max": 90,
  "x_rot_min": -90,
  "y_rot_max": 90,
  "y_rot_min": -90,
  "explosion": {
    "explode": true,
    "damage": 500,
    "radius": 8,
    "destroy_block": true,
    "proximity_fuze": true,
    "proximity_radius": 4
  },
  "seeker_fov": 30,
  "mass": 0.01,
  "thrust": 0.01,
  "motor_burn_time": 300,
  "drag_coefficient": 0.005,
  "max_g": 30,
  "reference_speed": 1,
  "guidance": "HOMING",
  "homing_mode": "ACTIVE_RADAR"
}
```

| 字段 | 说明 |
|:----|:----|
| `damage` | 直接命中伤害 |
| `shoot_interval` | 发射间隔（毫秒） |
| `max_capacity` | 载弹量 |
| `x_rot_max/min` | 发射架俯仰角限制（度） |
| `y_rot_max/min` | 发射架水平角限制（度） |
| `explosion.proximity_fuze` | 是否启用近炸引信 |
| `explosion.proximity_radius` | 近炸触发距离 |
| `seeker_fov` | 导引头视场角（度） |
| `mass` | 弹体质量 |
| `thrust` | 发动机推力 |
| `motor_burn_time` | 发动机工作时间（tick） |
| `drag_coefficient` | 空气阻力系数 |
| `max_g` | 最大过载（G） |
| `reference_speed` | 参考速度 |

### 制导模式 (guidance)

| 模式 | 说明 |
|:----|:----|
| `HOMING` | 追踪目标实体，需搭配导引模式。操作武器瞄准目标→按 `R` 锁定→发射 |
| `PRESET` | 飞向预设坐标点 |
| `SACLOS` | 半自动指令瞄准线，发射后导弹追踪武器的瞄准点 |

### 导引模式 (homing_mode)

仅在 `guidance` 为 `HOMING` 时有效：

| 模式 | 说明                        |
|:----|:--------------------------|
| `INFRARED` | 红外制导                |
| `ELECTRO_OPTICAL` | 光电制导                 |
| `SEMI_ACTIVE_RADAR` | 半主动雷达制导，依赖发射载具的雷达持续照射     |
| `ACTIVE_RADAR` | 主动雷达制导，导弹自带雷达，达到设定距离后主动搜索 |

## 火箭 (rocket)

无制导火箭弹，发射后沿直线飞行。

```json
{
  "type": "ywzj_vehicle:rocket",
  "name": "火箭弹",
  "damage": 50,
  "shoot_interval": 200,
  "max_capacity": 19,
  "velocity": 4,
  "explosion": {
    "explode": true,
    "damage": 100,
    "radius": 4
  },
  "reload": {
    "time": 200,
    "ammo": "ywzj_vehicle:ammo_rocket"
  }
}
```

## 榴弹 (grenade)

抛射爆炸物，弹道为抛物线。适用于榴弹发射器、烟雾弹发射器等。

```json
{
  "type": "ywzj_vehicle:grenade",
  "name": "榴弹",
  "damage": 20,
  "shoot_interval": 100,
  "max_capacity": 30,
  "velocity": 4,
  "explosion": {
    "explode": true,
    "damage": 30,
    "radius": 3
  },
  "reload": {
    "time": 200,
    "ammo": "ywzj_vehicle:ammo_grenade"
  }
}
```

## 航弹 (aerial_bomb)

航空炸弹，无动力的平抛爆炸物，可钻地，配置`homing`为`true`可启用制导航弹，具备追踪锁定的目标实体或瞄准点坐标的能力。

```json
{
  "type": "ywzj_vehicle:aerial_bomb",
  "name": "制导航弹",
  "damage": 500,
  "shoot_interval": 1000,
  "max_capacity": 4,
  "fuse_delay_tick": 60,
  "penetration_depth": 0,
  "homing": false,
  "drag_coefficient": 0.005,
  "max_g": 2,
  "reference_speed": 1,
  "explosion": {
    "explode": true,
    "damage": 1000,
    "radius": 16,
    "destroy_block": true
  }
}
```

| 字段 | 类型 | 默认值 | 说明 |
|:----|:----|:----|:----|
| `damage` | float | 5 | 直接命中伤害 |
| `shoot_interval` | int | 100 | 投放间隔（毫秒） |
| `max_capacity` | int | 64 | 载弹量 |
| `fuse_delay_tick` | int | 60 | 引信延迟（tick），触地后延时引爆 |
| `penetration_depth` | float | 0 | 侵彻深度，穿入方块的距离 |
| `homing` | bool | false | 是否启用制导，为`true`则航弹追踪锁定目标 |
| `drag_coefficient` | float | 0.005 | 空气阻力系数，影响制导段的机动衰减 |
| `max_g` | float | 2 | 最大过载（G），限制制导段的转弯强度 |
| `reference_speed` | float | 1 | 参考速度，影响制导段的修正强度 |
| `explosion` | object | — | 爆炸参数，参见[爆炸与核弹](#爆炸与核弹) |

### 制导航弹

当`homing`为`true`时，航弹投放后会追踪当前武器站**锁定**的目标实体；若未锁定实体但有瞄准点坐标，则飞向瞄准点。

制导航弹的机动性由`drag_coefficient`、`max_g`、`reference_speed`共同控制，预期用于短距滑翔修正而非远距巡航——`max_g`默认仅2G，远小于导弹的30G。

## 热诱箔条 (decoy_flare)

可干扰红外弹与雷达弹。默认按 `Left Alt` 键发射。

```json
{
  "type": "ywzj_vehicle:decoy_flare",
  "name": "干扰弹",
  "shoot_interval": 200,
  "max_capacity": 30,
  "reload": {
    "time": 100,
    "ammo": "ywzj_vehicle:ammo_decoy_flare"
  }
}
```

## 爆炸与核弹

### 爆炸参数

大部分武器类型的 `explosion` 字段支持以下参数：

| 字段 | 类型 | 说明 |
|:----|:----|:----|
| `explode` | bool | 是否产生爆炸 |
| `damage` | float | 爆炸伤害值 |
| `radius` | float | 爆炸半径（block） |
| `destroy_block` | bool | 是否破坏方块 |
| `proximity_fuze` | bool | 近炸引信（仅导弹） |
| `proximity_radius` | float | 近炸触发距离（仅导弹） |

### 核弹特性

当爆炸 `radius` 超过 32 时，爆炸被识别为**核爆**，触发特殊效果：

- **蘑菇云** — 包含云柱（stem）、云冠（cap）和沉降粒子（fallout），视觉效果随半径缩放
- **冲击波环** — 多层扩散环
- **屏幕震动** — 震幅和持续时间随半径递增
- **分帧破坏** — 超大范围方块破坏会分批处理（每tick最多1024个方块），避免游戏卡死

模组内置了核航弹示例 `ywzj_vehicle:nuclear_gravity_bomb`：

```json
{
  "type": "ywzj_vehicle:aerial_bomb",
  "name": "Nuclear Gravity Bomb",
  "damage": 10,
  "shoot_interval": 100,
  "max_capacity": 8,
  "reload": {
    "time": 100,
    "ammo": "ywzj_vehicle:ammo_aerial_bomb"
  },
  "explosion": {
    "explode": true,
    "damage": 4399,
    "radius": 128,
    "destroy_block": true
  }
}
```

爆炸效果按半径分为四档：

| 半径范围 | 爆炸等级 | 视觉效果 |
|:----|:----|:----|
| ≤ 2 | 小型 | 基础爆炸粒子 + 闪光 |
| 2 ~ 8 | 中型 | 烟云粒子 + 水面特效 |
| 8 ~ 32 | 大型 | 冲击波环 + 大规模烟云 |
| > 32 | 核爆 | 蘑菇云 + 冲击波环 + 屏幕震动 + 分帧破坏 |
