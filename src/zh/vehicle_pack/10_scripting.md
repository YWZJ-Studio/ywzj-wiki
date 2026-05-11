---
order: 10
icon: book
---

# JS脚本

YWZJ使用Rhino引擎支持JavaScript脚本，用于实现程序化动画、载具行为等。

::: warning
强烈建议仅在封装好的功能（如 `bone_binding`、`animation_controller`）确实无法满足需求时，才使用脚本实现。脚本的开销通常是封装功能的数倍甚至数十倍。
:::

## 脚本基础

脚本文件存放于 `assets/<命名空间>/scripts/` 目录，通过动画控制器的 `script` 节点引用。

脚本运行在沙盒环境中，仅可访问 `org.ywzj.vehicle` 包下的类以及 `java.lang.String`，无法访问Minecraft原版或其他模组的类。

## 脚本结构

### updateBones

最常用的入口函数，每帧调用，用于动态更新骨骼姿态。需要返回一个 `PoseHelper` 对象：

```js
function updateBones(context) {
    const builder = createPoseBuilder();

    // 控制舵面偏转
    var pitchInput = context.getPower();
    builder.setRotation("elevator", -pitchInput * 16, 0, 0);

    // 控制螺旋桨旋转
    var propellerAngle = (previousAngle + context.getPower() / 5) % 360;
    builder.setRotation("propeller", 0, -propellerAngle, 0);

    // 隐藏已发射的导弹
    let remain = context.getWeaponRemainAmmo("sighting_system", 1);
    for (let i = 0; i < missileBones.length; i++) {
        if (i < missileBones.length - remain) {
            builder.hideBone(missileBones[i]);
        }
    }

    return builder;
}
```

### init

初始化函数，在脚本加载时调用一次：

```js
function init(context) {
    // 初始化变量、缓存等
}
```

## 上下文方法

`context` 对象提供载具状态的访问。完整API参见 [动画上下文](../ani_controller/01_context.md)。

以下是脚本中最常用的方法：

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getPower()` | `float` | 发动机功率（0~1） |
| `context.getSpeed()` | `double` | 当前速度 |
| `context.getEngineSpeed()` | `float` | 发动机转速 |
| `context.getXRot()` | `float` | 载具X轴旋转（俯仰） |
| `context.getYRot()` | `float` | 载具Y轴旋转（偏航） |
| `context.getZRot()` | `float` | 载具Z轴旋转（滚转） |
| `context.getPartXRot(id)` | `float` | 部件X轴旋转角度 |
| `context.getPartYRot(id)` | `float` | 部件Y轴旋转角度 |
| `context.getWeaponRemainAmmo(partId, weaponIndex)` | `int` | 剩余弹药数 |
| `context.getWeaponName(partId, weaponIndex)` | `String` | 武器显示名称 |
| `context.getControlUnit()` | `ControlUnit` | 操控单元，可读取键盘输入 |
| `context.getAnimationRunners()` | `AnimationRunnerHolder` | 动画运行器，用于播放动画 |
| `context.getPartialTick()` | `float` | 部分刻（0~1），用于平滑插值 |
| `context.currentTimeMillis()` | `long` | 系统时间（毫秒） |

## PoseHelper API

`PoseHelper` 是构建程序化姿态的核心API，通过全局函数 `createPoseBuilder()` 创建：

```js
function updateBones(context) {
    const builder = createPoseBuilder();

    // 设置骨骼旋转 (x, y, z 均为角度制)
    builder.setRotation("bone_name", xRot, yRot, zRot);

    // 设置骨骼位置偏移
    builder.setTranslation("bone_name", x, y, z);

    // 同时设置旋转和位移
    builder.setBone("bone_name", rotX, rotY, rotZ, transX, transY, transZ);

    // 同时设置旋转、位移和缩放
    builder.setBoneWithScale("bone_name", rotX, rotY, rotZ, transX, transY, transZ, scaleX, scaleY, scaleZ);

    // 隐藏骨骼（常用于已发射的导弹挂架）
    builder.hideBone("bone_name");

    // 清除所有变换
    builder.clear();

    // 构建最终姿态
    return builder.build();
}
```

::: tip
`setBoneWithScale` 在需要缩放骨骼时使用（如炮管后座效果），旋转为角度制，缩放为倍率。
:::

## 全局工具

### MathUtil

创建三维向量：

```js
var vec = MathUtil.vec3(1.0, 2.0, 0.5);
// vec.x, vec.y, vec.z 可访问分量
```

### ScriptVec3

`MathUtil.vec3` 返回的 `ScriptVec3` 对象具有以下方法：

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `vec.set(x, y, z)` | `ScriptVec3` | 设置分量 |
| `vec.copy()` | `ScriptVec3` | 复制向量 |
| `vec.add(dx, dy, dz)` | `ScriptVec3` | 加法 |
| `vec.sub(dx, dy, dz)` | `ScriptVec3` | 减法 |
| `vec.scale(s)` | `ScriptVec3` | 缩放 |
| `vec.length()` | `double` | 向量长度 |
| `vec.dot(other)` | `double` | 点积 |
| `vec.cross(other)` | `ScriptVec3` | 叉积 |
| `vec.normalize()` | `ScriptVec3` | 归一化 |

### ParticleUtil

构建粒子效果参数：

```js
var particle = ParticleUtil.buildParticleOptions("particle_name", "params");
```

返回 `ParticleOptionsWrapper`（失败时返回 `null`）。

### ScriptCache

用于在帧之间持久化数据，相比全局变量在热重载时更安全：

```js
var cache = new org.ywzj.vehicle.api.scripts.ScriptCache(0);

function updateBones(context) {
    var prevValue = cache.get();  // 读取上一帧的值
    var newValue = calculate();
    cache.set(newValue);          // 保存当前帧的值
}
```

## ControlUnit

通过 `context.getControlUnit()` 获取操控单元，直接读取玩家的键盘输入：

```js
function updateBones(context) {
    var control = context.getControlUnit();
    const builder = createPoseBuilder();

    if (control.forward) {
        // 前进键按下
        builder.setRotation("throttle_lever", -30, 0, 0);
    }
    if (control.up) {
        // 上升键按下
    }

    return builder;
}
```

可用的布尔字段：`forward`、`backward`、`left`、`right`、`up`、`down`、`leftYaw`、`rightYaw`、`functionalUp`、`functionalDown`、`functionalLeft`、`functionalRight`。

浮点字段：`xRot`、`yRot`（瞄具旋转值），以及 `xRotKeep`、`yRotKeep`（保持标志）。

## AnimationRunnerHolder

通过 `context.getAnimationRunners()` 获取，可在脚本中程序化播放动画：

```js
function updateBones(context) {
    const builder = createPoseBuilder();
    var runners = context.getAnimationRunners();

    // 在默认轨道上播放动画
    runners.playAnimation("landing_gear_deploy", AnimationPlayType.PLAY_ONCE_HOLD);

    // 在指定轨道上播放
    runners.playAnimation("turret_track", "turret_spin", AnimationPlayType.LOOP);

    // 获取动画的姿态
    var trackPose = runners.getTrackPose("turret_track");

    return builder;
}
```

`AnimationPlayType` 取值：
- `AnimationPlayType.PLAY_ONCE_STOP` — 播放一次后停止
- `AnimationPlayType.PLAY_ONCE_HOLD` — 播放一次后保持在最后一帧
- `AnimationPlayType.LOOP` — 循环播放

## 载具类型专用上下文

### 轮式载具 (WheeledVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getForwardSpeed()` | `float` | 前进速度 |
| `context.getSteeringAngle()` | `float` | 转向角度 |
| `context.getWheelDegrees(radius)` | `float` | 指定半径的车轮旋转角度 |

### 履带式载具 (TrackedVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getForwardSpeed()` | `float` | 前进速度 |
| `context.getTurnSpeed()` | `float` | 转向速度 |
| `context.getLeftWheelDegrees(radius)` | `float` | 左驱动轮旋转角度 |
| `context.getRightWheelDegrees(radius)` | `float` | 右驱动轮旋转角度 |
| `context.getTrackPose()` | `PoseHelper` | 履带动画姿态 |

### 旋翼机 (RotaryWingVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getCollectivePitch()` | `float` | 总距（经插值） |
| `context.getPitchInput()` | `float` | 俯仰输入（经插值） |
| `context.getRollInput()` | `float` | 滚转输入（经插值） |

### 固定翼 (FixedWingVehicleContext)

| 方法 | 返回 | 说明 |
|:----|:----|:----|
| `context.getThrottleLevel()` | `float` | 节流阀值（经插值） |
| `context.getPitchInput()` | `float` | 俯仰输入（经插值） |
| `context.getYawInput()` | `float` | 偏航输入（经插值） |
| `context.getRollInput()` | `float` | 滚转输入（经插值） |

## 真实示例

### 固定翼：控制面偏转与导弹挂架

```js
function updateBones(context) {
    const builder = createPoseBuilder();
    var pitchInput = context.getPitchInput();
    var yawInput = context.getYawInput();

    // 襟副翼
    builder.setRotation("FlapRB2", -pitchInput * 16, 0, 0);
    builder.setRotation("FlapRB3", -pitchInput * 16, 0, 0);
    // 垂直尾翼
    builder.setRotation("RightVerticalTailInner", 0, -yawInput * 16, 0);
    // 隐藏已发射导弹
    let missiles_pl_8 = ["PL-8", "PL-81", "PL-82", "PL-83", "PL-84"];
    let remainMissiles = context.getWeaponRemainAmmo("sighting_system", 1);
    for (let i = 0; i < missiles_pl_8.length; i++) {
        if (i < missiles_pl_8.length - remainMissiles) {
            builder.hideBone(missiles_pl_8[i]);
        }
    }
    return builder;
}
```

### 旋翼机：螺旋桨旋转与炮塔指向

```js
var cache = new org.ywzj.vehicle.api.scripts.ScriptCache(0);

function updateBones(context) {
    const builder = createPoseBuilder();
    // 主旋翼旋转
    var prevRot = cache.get();
    var rotation = (prevRot + context.getPower() / 5) % 360;
    cache.set(rotation);
    builder.setRotation("propeller", 0, -rotation, 0);
    // 尾旋翼
    builder.setRotation("tailPropeller", -rotation * 5, 0, 0);
    // 炮塔指向
    builder.setRotation("turret", 0, -context.getPartYRot("auto_cannon"), 0);
    builder.setRotation("barrel", -context.getPartXRot("auto_cannon"), 0, 0);
    return builder;
}
```

## 性能建议

1. **优先使用 `bone_binding`** — 动画控制器中的 `bone_binding` 可以直接绑定部件旋转到骨骼，无需脚本
2. **避免在脚本中创建大量对象** — 每帧创建大量临时对象会增加GC压力
3. **减少循环** — 尽可能简化 `updateBones` 中的逻辑
4. **使用 ScriptCache** — 需要跨帧持久化的数据用缓存放，而不要用全局变量（全局变量在热重载时会丢失）
