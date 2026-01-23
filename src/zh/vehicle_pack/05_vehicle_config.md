---
order: 5
icon: book
---

# 载具配置
以下讨论的是载具包的`data`目录

## 载具配置文件
一个载具配置文件对应一个独立载具，其记录了载具所使用的模板，性能参数，视角配置，部件结构关系等

## 概览
在`data/tutorial/vehicles`目录下新建`载具名.json`文件，本文示例为`data/tutorial/vehicles/ztz99a.json`
```
{
  "type": "ywzj_vehicle:tracked_vehicle", # 使用履带式载具模板
  "attributes": {                         # 作为履带式载具的属性
    "brake_acceleration": 0.025,
    "forward_acceleration": 0.01,
    "backward_acceleration": 0.01,
    "max_speed_forward": 0.5,
    "max_speed_backward": 0.2,
    "turn_acceleration": 1,
    "max_turn": 2
  },
  "max_health": 300,
  "view_info": {                          # 第三人称视角与声音距离
    "third_person_center_offset": [0, 3, 0],
    "third_person_distance": 7,
    "sound_distance": 7
  },
  "energy_info": {
    "energy_capacity": 1, # 油箱大小，注意油量会影响载具总重
    "energy_consumption_per_tick": 0.00001, # 油箱消耗速度
    "engine_particle_offsets": [[-2, 1.7, -2.5], [2, 1.7, -2.5]]  # 引擎烟粒子相对于载具枢轴的位置
  },
  "physics_info": {
    "mass": 1, # 质量
    "can_destroy_block": true # 是否能破坏方块
  },
  "defense_stats": {
    "damage_threshold": 50, # 最小击穿伤害，低于该值将只能造成很微小的伤害
    "impact_kinetic_damage_coefficient": 0.1 # 撞击地形时，动能造成伤害的系数
  },
  "structure_model": "ywzj_vehicle:vehicle/ztz99a", # 结构模型，存放于 data/tutorial/models/bedrock/vehicle/ztz99a.structure.json
  "parts": [ # 载具部件配置，注意：第一个可乘坐的部件是驾驶员位
    {
      "id": "turret", # 部件id，本载具下需唯一
      "name": "turret", # 部件名，支持语言文件lang key
      "type": "ywzj_vehicle:weapon", # 使用武器单元作为模板来解析本部件
      "structure_bone": "turret", # 在结构模型中，使用"turret"组描述本部件的OBB结构
      "seat_offset": [-0.5, 2.5, 0.375], # 在未发生任何旋转时，该部件的乘员相对于载具枢轴的偏移
      "rot_info": { # 旋转类单元专属的配置，描述旋转性能
        "x_rot_speed": 1.5, # 高低机转速
        "y_rot_speed": 1.5, # 方向机转速
        "x_rot_max": 5,     # 俯角
        "x_rot_min": -13    # 仰角
      },
      "optical_sight_offset": [0.719, 0.883, 0.14], # 武器单元的瞄具位置相对于武器单元枢轴的偏移，影响开镜视角
      "operator_view_offset": [0, 1.5, 0],  # 武器单元的第三人称位置相对于武器单元枢轴的偏移，影响开镜视角
      "fire_control_lock_type": "aim_hit",  # 火控锁定方式，此为需完全瞄准才可锁定
      "optical_sight_type": "crt", # 开镜时有模拟电视效果
      "zoom_max": 8, # 开镜的最大放大倍数
      "weapons": [ # 武器配置，本武器单元有三种武器：主炮、同轴机枪、烟雾发射器，其后两者也属于载具的部件
        "tutorial:cannon_125mm",
        {
          "id": "tutorial:qjt_5.8mm",
          "part_unit_id": "turret_machine_gun"
        },
        {
          "id": "ywzj_vehicle:launcher_smoke_grenade",
          "part_unit_id": "turret_smoke_grenade"
        }
      ]
    },
    {
      "id": "turret_machine_gun",
      "name": "turret_machine_gun",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "turret_machine_gun",
      "is_seat": false, # 同轴机枪不是一个乘位，不能坐玩家
      "base": "turret", # 同轴机枪附着于炮塔部件上
      "rot_info": {
        "x_rot_speed": 1.5,
        "y_rot_speed": 0,
        "x_rot_max": 5,
        "x_rot_min": -13
      }
    },
    {
      "id": "turret_smoke_grenade", # 参考同轴机枪
      "name": "turret_smoke_grenade",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "turret_smoke_grenade",
      "is_seat": false,
      "base": "turret",
      "rot_info": {
        "x_rot_speed": 0,
        "y_rot_speed": 0
      }
    },
    {
      "id": "commander_machine_gun", # 车长高射机枪是一个乘位，玩家可切换于其上
      "name": "commander_machine_gun",
      "type": "ywzj_vehicle:weapon",
      "structure_bone": "commander_machine_gun",
      "seat_offset": [0.5, 2.5, 0.275],
      "operator_on_weapon_unit": false, # 乘员无需因机枪的转动而转动自身。与之对应的炮塔部件，因为乘员都在吊篮上一齐运动，所以需要转动自身
      "base": "turret",
      "rot_info": {
        "x_rot_speed": 4.5,
        "y_rot_speed": 4.5,
        "x_rot_max": 15,
        "x_rot_min": -45,
        "need_power": false
      },
      "operator_view_offset": [0.5, 0.3, -0.5],
      "optical_sight_type": "operator", # 无瞄具的开镜
      "zoom_max": 2,
      "weapons": [
        "tutorial:qjc88a"
      ]
    },
    {
      "id": "seat", # 一个普通的乘位，除了容纳玩家乘坐，没有特殊功能
      "name": "seat",
      "type": "ywzj_vehicle:generic",
      "seat_offset": [0, 1.5, 1.7]
    }
  ]
}
```