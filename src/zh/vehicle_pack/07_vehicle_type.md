---
order: 7
icon: book
---

# 载具类型
载具类型是对各类载具的抽象，体现于载具配置的`type`与`attributes`参数

## 载具模板
不同类型的载具体现于不同的**载具模板**，目前官方已实现了`通用`、`轮式`、`履带式`、`旋翼机式`、`固定翼式`载具模板，附属作者也可效仿追加新的载具模板类型。

在载具配置的`type`参数中填写不同的枚举值以启用不同的载具模板
```
{
  "type": "ywzj_vehicle:tracked_vehicle", # 载具模板
  "attributes": {
    "brake_acceleration": 0.025,
    "forward_acceleration": 0.01,
    "backward_acceleration": 0.01,
    "max_speed_forward": 0.5,
    "max_speed_backward": 0.2,
    "turn_acceleration": 1,
    "max_turn": 2
  },
  ...
```

| 模板名 |               type               | 释义                     |
|:----|:--------------------------------:|:-----------------------|
| 通用  |       ywzj_vehicle:generic       | 无运动实现，但具备可控部件的载具，如固定机枪 |
| 轮式  |   ywzj_vehicle:wheeled_vehicle   | 如汽车                    |
| 履带式 |   ywzj_vehicle:tracked_vehicle   | 如坦克                    |
| 旋翼机式 | ywzj_vehicle:rotary_wing_vehicle | 如直升机、四轴无人机             |
| 固定翼式 | ywzj_vehicle:fixed_wing_vehicle  | 如战斗机                   |

## 载具属性
不同的载具类型可使用不同的载具属性

### 轮式
```
"attributes": {
    "brake_force": 0.02, # 刹车力
    "forward_force": 0.03, # 前进时的正向推进力
    "backward_force": 0.05, # 倒车时的反向推进力
    "max_speed_forward": 0.8, # 最大前进速度
    "max_speed_backward": 0.2, # 最大倒车速度
    "turn_step": 1, # 转向加速度
    "max_turn": 3 # 最大转向速度
  }
```

### 履带式
```
"attributes": {
    "brake_acceleration": 0.025, # 刹车加速度
    "forward_acceleration": 0.01, # 前进加速度
    "backward_acceleration": 0.01, # 倒车加速度
    "max_speed_forward": 0.5,  # 最大前进速度
    "max_speed_backward": 0.2, # 最大倒车速度
    "turn_acceleration": 1, # 转向加速度
    "max_turn": 2 # 最大转向速度
  }
```

### 旋翼机式
```
"attributes": {
    "main_rotor_force": 0.07, # 主螺旋桨推力
    "x_rot_speed_acceleration": 1.0, # 俯仰旋转加速度
    "x_rot_speed_max": 4.0, # 最大俯仰转速
    "y_rot_speed_acceleration": 1.0, # 水平旋转加速度
    "y_rot_speed_max": 4.0, # 最大水平转速
    "z_rot_speed_acceleration": 1.0, # 滚转加速度
    "z_rot_speed_max": 4.0, # 最大滚转转速
    "max_air_speed": 1.5 # 最大空速
  }
```

### 固定翼式
```
"attributes": {
    "thrust": 0.01, // 推力
    "thrust_k": 1.3,  // 加力后的推力乘子
    "ceiling": 512, // 升限
    "x_rot_input_step": 0.2, // 三轴操控灵敏度相关
    "y_rot_input_step": 0.5,
    "z_rot_input_step": 0.2,
    "air_drag_k_min": 0.002, // 攻角为0度时的空气阻力系数
    "air_drag_k_max": 0.008, // 攻角为180度时的空气阻力系数
    "lift_to_drag_k": 15.0,  // 升阻比
    "x_rot_input_drag_k": 1.0, // 三轴舵面阻力系数
    "y_rot_input_drag_k": 0.25,
    "z_rot_input_drag_k": 0.125,
    "landing_gear_drag_k": 0.5, // 起落架阻力系数
    "turn_rate_by_speed": 0.4, // 能量与机动性的关系系数
    "x_turn_rate": 1, // 三轴最大转速相关
    "y_turn_rate": 3,
    "z_turn_rate": 4,
    "vortex_offsets": [[19.84, 5.078, -3.373], [-19.84, 5.078, -3.373]] // 翼尖涡流偏移
  },
```