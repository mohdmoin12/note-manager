import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    name: "John Doe",
    darkMode: theme === "dark",
  });

  useEffect(() => {
    setTheme(settings.darkMode ? "dark" : "light");
  }, [settings.darkMode, setTheme]);

  const handleSave = () => {
    console.log("Saved settings:", settings);
    // You can add toast or success alert here
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      <Card>
        <CardContent className="space-y-6 py-6">
          {/* Name Input */}
          <div>
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={settings.name}
              onChange={(e) =>
                setSettings({ ...settings, name: e.target.value })
              }
              placeholder="Your name"
              className="mt-2"
            />
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, darkMode: checked })
              }
            />
          </div>

          {/* Save Button */}
          <Button className="w-full" onClick={handleSave}>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
