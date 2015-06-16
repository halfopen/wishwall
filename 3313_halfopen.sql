


CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '评论者名字',
  `c_id` smallint(5) unsigned NOT NULL COMMENT '评论的对象',
  `content` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  `time` datetime NOT NULL,
  `head_pic` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `c_name` (`c_name`,`c_id`),
  KEY `c_id` (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- 插入之前先把表清空（truncate） `comment`
--

TRUNCATE TABLE `comment`;
-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) CHARACTER SET utf8 NOT NULL,
  `sex` enum('male','female','','') DEFAULT 'male',
  `password` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `head_pic` int(11) NOT NULL DEFAULT '1',
  `active_num` varchar(48) NOT NULL DEFAULT '0' COMMENT '激活码，当它为1的时候表示已经激活',
  `skin` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `name_2` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- 插入之前先把表清空（truncate） `user`
--

TRUNCATE TABLE `user`;
--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `sex`, `password`, `email`, `phone`, `head_pic`, `active_num`, `skin`) VALUES
(1, 'admin', 'male', 'admin', '528397553@qq.com', '15527039473', 0, '1', 1),
(18, 'visitor', 'male', 'visitor', '528397553@qq.com', '15527039473', 1, '0', 0);

-- --------------------------------------------------------

--
-- 表的结构 `wish`
--

CREATE TABLE IF NOT EXISTS `wish` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(48) CHARACTER SET utf8 DEFAULT 'my_wish',
  `content` text CHARACTER SET utf8 NOT NULL,
  `time` varchar(11) CHARACTER SET utf8 NOT NULL,
  `username` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '发心愿用户',
  `re_name` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '接受心愿用户',
  `status` char(16) CHARACTER SET utf8 NOT NULL DEFAULT '未实现',
  `click` int(11) NOT NULL DEFAULT '1' COMMENT '点击率',
  `score` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `re_name` (`re_name`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=33 ;

--
-- 插入之前先把表清空（truncate） `wish`
--

TRUNCATE TABLE `wish`;
--
-- 限制导出的表
--

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `wish` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`c_name`) REFERENCES `user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `wish`
--
ALTER TABLE `wish`
  ADD CONSTRAINT `wish_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`name`),
  ADD CONSTRAINT `wish_ibfk_2` FOREIGN KEY (`re_name`) REFERENCES `user` (`name`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
