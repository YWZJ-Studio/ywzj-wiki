---
order: 12
icon: book
---

# 音效系统

YWZJ使用原版Minecraft音效系统。音效事件通过 `sounds.json` 定义，在实际使用时通过载具/武器的资产配置引用。

## sounds.json

在载具包的 `assets/<命名空间>/` 目录下创建 `sounds.json`，格式与原版资源包完全一致：

```json
{
  "cannon_125mm_shot": {
    "sounds": [
      "dragonrise_reforge_ywzj:weapon/artillery/fire1",
      "dragonrise_reforge_ywzj:weapon/artillery/fire2",
      "dragonrise_reforge_ywzj:weapon/artillery/fire3"
    ]
  },
  "missile_launch": {
    "sounds": [
      "dragonrise_reforge_ywzj:weapon/missile/launch1",
      "dragonrise_reforge_ywzj:weapon/missile/launch2"
    ]
  }
}
```

- 音效文件（`.ogg`）存放于 `assets/<命名空间>/sounds/` 目录
- `sounds` 数组中的多个音效会随机选取播放
- 引用格式：`<命名空间>:<路径/文件名>`（不含 `.ogg` 扩展名）

## 载具音效

在载具的资产配置（`display/vehicle/`）的 `sounds` 字段中引用音效：

```json
{
  "sounds": {
    "engine_start": "tutorial:ztz99a_engine_start",
    "engine_idle": "tutorial:ztz99a_engine_idle",
    "engine_run": "tutorial:ztz99a_engine_run",
    "engine_stop": "tutorial:ztz99a_engine_stop",
    "passby": "tutorial:ztz99a_passby"
  }
}
```

| 音效键 | 说明 | 适用类型 |
|:----|:----|:----|
| `engine_start` | 发动机启动音效 | 所有动力载具 |
| `engine_idle` | 发动机待机循环音效 | 所有动力载具 |
| `engine_run` | 发动机运转循环音效 | 所有动力载具 |
| `engine_stop` | 发动机关闭音效 | 所有动力载具 |
| `passby` | 通过音效（多普勒效应） | 固定翼/旋翼 |

::: tip
`engine_idle` 和 `engine_run` 是循环播放的，`engine_start` 和 `engine_stop` 是单次播放的。
:::

## 武器音效

在武器的资产配置（`display/weapon/`）的 `sounds` 字段中引用音效：

```json
{
  "type": "ywzj_vehicle:weapon",
  "sounds": {
    "fire": "ywzj_vehicle:gun_7.62mm_shot",
    "shell": "ywzj_vehicle:cannon_shell_drop",
    "reload": "ywzj_vehicle:gun_reload"
  }
}
```

| 音效键 | 说明 |
|:----|:----|
| `fire` | 开火音效（每次射击播放） |
| `reload` | 换弹音效 |
| `shell` | 弹壳落地音效 |

## 音效距离

载具的音效传播距离由载具配置中 `view_info.sound_distance` 控制：

```json
{
  "view_info": {
    "sound_distance": 7
  }
}
```

单位近似为区块（block），音效在此距离内可被听到。

## 添加自定义音效

1. 将 `.ogg` 格式音效文件放入 `assets/<命名空间>/sounds/` 目录
2. 在 `sounds.json` 中注册音效事件
3. 在载具或武器的资产配置中引用

支持的音效格式：**OGG Vorbis**（与原版Minecraft一致）。
