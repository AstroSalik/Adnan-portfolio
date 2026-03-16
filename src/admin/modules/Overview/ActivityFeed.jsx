import React from 'react';
import { motion } from 'framer-motion';
import { useActivity } from '../../../hooks/useActivity';
import Badge from '../../../components/Badge';

export default function ActivityFeed({ activities = [] }) {
  const { getRelativeTime } = useActivity();

  if (activities.length === 0) {
    return (
      <div className="bg-panel border border-subtle p-8 text-center">
        <p className="font-mono text-muted text-sm tracking-widest">// NO RECENT ACTIVITY DETECTED</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-electric font-mono text-xs">//</span>
        <h3 className="font-mono text-muted text-[10px] tracking-[0.3em] uppercase">
          RECENT ACTIVITY LOG
        </h3>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-4 p-4 bg-panel/50 border border-subtle hover:bg-hover/30 transition-colors group`}
          >
            <div className={`mt-1`}>
               <Badge type={activity.module.toUpperCase()} label={activity.module} />
            </div>
            
            <div className="flex-1">
              <p className="font-mono text-secondary text-sm leading-relaxed group-hover:text-primary transition-colors">
                {activity.description}
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-muted text-[10px] whitespace-nowrap">
                {getRelativeTime(activity.timestamp)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
